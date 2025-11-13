import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel/TextInputWithLabel';
import TextareaWithLabel from '../../shared/TextareaWithLabel/TextareaWithLabel';
import { DEFAULT_PHOTO_URL, DEFAULT_CATEGORY } from '../../shared/constants';
import Button from '../../shared/Button/Button';
import { useRecipeContext } from '../../context/RecipeContext';
import Loader from '../../shared/Loader/Loader';

export default function RecipeForm({
  addRecipe,
  updateRecipe,
  recipeToEdit = null,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [ingredients, setIngredients] = useState([{ amount: '', item: '' }]);
  const [methodSteps, setMethodSteps] = useState(['']);
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(DEFAULT_PHOTO_URL);
  const [errors, setErrors] = useState({ title: '', method: '' });
  const { state, dispatch } = useRecipeContext();

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { amount: '', item: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setMethodSteps([...methodSteps, '']);
  };

  const handleRemoveStep = (index) => {
    setMethodSteps(methodSteps.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(file));
  };

  // remove a temporary URL (for file preview) from memory
  // to avoid a memory leak
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const cloudinaryUpload = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    try {
      dispatch({ type: 'startRequest' });
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Cloudinary upload failed.');
      }
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      dispatch({
        type: 'setLoadError',
        errorMessage: error.message,
      });
    } finally {
      dispatch({ type: 'endRequest' });
    }
  };

  // if editing, populate form with recipe data
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      setCategory(recipeToEdit.category || DEFAULT_CATEGORY);
      setIngredients(recipeToEdit.ingredients) || [{ amount: '', item: '' }];
      setMethodSteps(recipeToEdit.method || ['']);
      setNotes(recipeToEdit.notes || '');
      setSource(recipeToEdit.source || '');
      setImageUrl(recipeToEdit.urlCloudinary || DEFAULT_PHOTO_URL);
    }
  }, [recipeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    let urlCloudinary = imageUrl;
    // upload to Cloudinary only if user chooses their own image
    // otherwise - use default image which is already uploaded
    if (imageFile) urlCloudinary = await cloudinaryUpload();

    // temporary
    const recipeData = {
      title,
      category,
      ingredients: JSON.stringify(ingredients),
      method: methodSteps.join('|||'),
      notes,
      source,
      urlCloudinary,
    };

    console.log('Recipe submitted:', recipeData);
    alert('Recipe saved! (check console for data)');

    if (recipeToEdit && updateRecipe) {
      updateRecipe({ id: recipeToEdit.id, ...recipeData });
    } else {
      addRecipe(recipeData);
    }

    handleCancel();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {state.isLoading && <Loader />}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full bg-white rounded-lg shadow-md p-6 overflow-y-auto space-y-6"
      >
        <h2 className="text-center my-1">
          {`${recipeToEdit ? 'Update ' : 'Create '}`}a recipe
        </h2>

        {/* upload image */}
        <div className="flex flex-row-reverse items-center justify-end gap-4 mb-[10px]">
          <label
            htmlFor="imageUpload"
            className="border border-gray-300 rounded-lg px-2 py-2 text-base mx-[10px] w-fit bg-gray-200 hover:cursor-pointer"
          >
            {imageUrl ? 'Change Image' : 'Choose Image'}
          </label>{' '}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex justify-center items-center border border-gray-300 rounded-md bg-gray-50 w-[200px] h-[150px]">
            <img
              src={imageUrl}
              alt="Recipe image"
              className="overflow-hidden h-[150px]"
            />
          </div>
        </div>
        {/* Title */}
        <div>
          <TextInputWithLabel
            labelText="Title:"
            value={title}
            onChange={(e) => {
              if (e.target.value) {
                setErrors({ ...errors, title: '' });
              } else {
                setErrors({ ...errors, title: 'Title is required.' });
              }
              setTitle(e.target.value);
            }}
            error={errors.title}
          />
        </div>
        {/* Category */}
        <div>
          <label className="formElementLabel">Category:</label>
          <div className="formElementWrapper">
            <select
              name="chooseCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="formElement"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="soup">Soup</option>
            </select>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="formElementLabel">Ingredients:</label>
          <ul className="space-y-3">
            {ingredients.map((ing, index) => (
              <li key={index} className="flex gap-2">
                <TextInputWithLabel
                  type="text"
                  value={ing.item}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].item = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  // className="flex-1 border border-gray-300 rounded-md px-2 py-1"
                  placeholder="Ingredient"
                />
                <TextInputWithLabel
                  type="text"
                  value={ing.amount}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].amount = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  // className="w-1/3 border border-gray-300 rounded-md px-2 py-1"
                  placeholder="Amount"
                />
                {/* Unit */}
                <div>
                  <label className="formElementLabel"></label>
                  <div className="formElementWrapper">
                    <select
                      name="chooseUnit"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="formElement"
                    >
                      <option value="psc">psc</option>
                      <option value="ml">ml</option>
                      <option value="gr">gr</option>
                      <option value="kg">kg</option>
                      <option value="cup">cup</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 text-sm text-teal-600 hover:text-teal-800"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Method */}
        <div>
          <label className="formElementLabel">Method (Steps):</label>
          <ol className="list-decimal space-y-3">
            {methodSteps.map((step, index) => (
              <li key={index} className="flex gap-2 pl-5">
                <TextareaWithLabel
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...methodSteps];
                    newSteps[index] = e.target.value;
                    setMethodSteps(newSteps);
                  }}
                  placeholder={`Step ${index + 1}`}
                  // rows={2}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={handleAddStep}
            className="mt-2 text-sm text-teal-600 hover:text-teal-800"
          >
            + Add Step
          </button>
        </div>

        <div>
          <TextareaWithLabel
            labelText="Notes (optional):"
            placeholder="Any extra notes or tips..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="pb-20">
          <TextInputWithLabel
            labelText="Source (optional):"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center mt-5">
          <Button title="Cancel" onClickHandler={handleCancel} />
          <Button
            disabled={state.isSaving}
            title={state.isSaving ? 'Saving...' : 'Save'}
            onClickHandler={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
