## React-Testing-Library Recipes

This is a work in progress. This will serve as a recipe for conducting tests with react components using `react-testing-library` and `jest`.

### Project Structure
- `components` - contains the components to be tested
- `__tests__` - contains the tests in numeric order based on the filenames.

### Recipes:
- **01-FavoriteNumber:** 
  - Basic element query and attribute checking
  - Firing events and checking null elements
- **02-A11y:**
  - Checking element for a11y(accessibility) using `jest-axe`
- **03-GreetingLoader:**
  - Basic mocking of API calls.
  - Testing function calls
  - Testing rerenders caused by API calls.
- **04-GreetingLoader2:**
  - Different approach to `03-GreetingLoader` in case of issue in other enviroments that have issues with mocking modules.
- **05-HiddenMessage:**
  - Testing modules with rerendering delays like `react-transition-group`
  - Mocking npm modules
