export default function About() {
  return (
    <>
      <p className="text-lg leading-8">
        This application is a lightweight tool designed to help users manage
        their recipes. It allows users to do the following:
      </p>
      <ul>
        <li className="mb-6 text-base">
          <span className="font-semibold">Add Recipe:</span> users can add new
          recipe with a title, image, ingredients, and cooking instructions.
        </li>
        <li className="mb-6 text-base">
          <span className="font-semibold">Edit Recipe:</span> users can update
          existing recipes to correct or change their details.
        </li>
        <li className="mb-6 text-base">
          <span className="font-semibold">Search</span> by recipe title.
        </li>

        <li className="mb-6 text-base">
          <span className="font-semibold">Filter</span> by recipe type (e.g
          lunch, breakfast, etc.)
        </li>
        <li className="mb-6 text-base">
          <span className="font-semibold">Alpabetical sort</span> by recipe
          title and <span className="font-semibold">sort</span> by time created.
        </li>
      </ul>
    </>
  );
}
