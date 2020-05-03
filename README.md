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
- **06-ErrorBoundary**

  - Testing `componentDidCatch` Lifecycle
  - Testing arguments using `expect.any()` and `expect.stringContaining()`
  - Mocking `console.error` or other functions using `jest.spy().mockImplementation()`
  - Clearing mocks using `mockRestore()`, `clearAllMocks()`, `mockClear()`
  - Snapshot testing using `toMatchInlineSnapshot()`

- **07-PostEdition**
  - Generate fake data using `test-data-bot`
  - Testing variables that has `Date()` value
  - Testing form submit
  - Mocking resolve and rejected promise using `mockResolvedValueOnce()` and `mockRejectedValueOnce()`
  - Mocking Redirect from `react-router-dom`
  - Testing new jsx elements during rerender using `findByRole()`
