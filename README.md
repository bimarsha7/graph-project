# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs all the packages the project requires

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Overview of Application

This application is a single page client side application that parse a csv file to show the graphs of the compression map.

### Performances Choices

- Strategies in React to manage state and prevent unnecessary re-renders: 
  - use `useMemo` and `useCallback` to memoize expensive calculation,
  - breakdown large components into smaller ones. Then, only the parts that change will render,
  - use `memo` in functional components to skip re-rendering a component when its props are unchanged,
  - use ContextAPI or Redux to properly manage global states of the react app,
  - use functional updates when new state depends on the previous state to avoid unnecessary re-renders,e.g. `setCount(prev => prev + 1)`,
  - use selector function with Redux to extract only the necessary data from the store, thus avoiding re-render due to unrelated state changes,

- Strategies to minimize API calls and manage state effectively:
  - implement a way to cache API responses like in-memory caching to store data in a global state in react for future use. You could also use the
  localStorage to store data that does not change frequently
  - use Debouncing to API calls to delay the call until use has stopped typing for a certain period of time
  - use throttling to limit the frequency of the API call over a period of time. This is useful for events that fire rapidly, like scroll or resize events.
  - batch requests together into one request to reduce the number of calls. Also, get the aggregated data for the related items at once than making
  another call for them
  - implement lazy loading so that the calls will be made when user reaches to certain stage or page position to get more data.
  - implement pagination for large number of data, fetching a subset of data at a time than the whole.
  - Polling and websocket : For real-time data, using WebSockets or long-polling instead of frequently hitting APIs can reduce the number of API calls significantly.
  - Stale-While-Revalidate: Serve cached data while fetching updated data in the background, ensuring users have fast access to data while keeping it up to date.

- Strategies to handle large datasets in the frontend without compromising user experience
  - implement pagination for large datasets, fetching a subset of data at a time than the whole.
  - If the data is relatively small and can fit in memory, we can implement pagination on the client side after fetching all data.
  - Implement infinite scrolling to load more data as the user scrolls down the page. This technique fetches additional data in the background, keeping the initial load light while progressively showing more content.
  - Get data on demand (Lazy Loading): Load only the essential data needed for the initial render and fetch additional details as required (e.g., on demand when a user expands an item).
  - Use libraries like react-window or react-virtualized to render only the visible portion of large lists or tables. This technique improves performance by minimizing the number of DOM nodes created and manipulated.
  - If dealing with complex or deeply nested data, consider flattening the structure to simplify rendering and improve lookup times.

- Strategies to implement real-time data updates from the backend to the frontend.
  - Use websocket: WebSockets allow for a persistent, two-way communication channel between the client and server. This enables real-time data transfer without the overhead of HTTP requests.
  - Use Server-Sent-Events: SSE is a one-way communication protocol from the server to the client, where the server can push updates to the client over HTTP. This is simpler than WebSockets for cases where only server-to-client communication is needed.
  - Libraries like React Query or SWR can be used for fetching and caching data efficiently, providing hooks for real-time updates.
  - Polling and Long polling: It can be used to regularly check for updates from the server. Although, it can lead to unnecessary API calls being made.
  Long polling is an improvement over the traditional polling. Here, the server holds the request sent from the client, until there is new data to sent. This reducing the number of requests.


