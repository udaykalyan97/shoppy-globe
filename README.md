# ShoppyGlobe E-commerce Application

A React-based e-commerce application that demonstrates various features including state management, routing, data fetching, and styling. 

---

## **Objective**
Develop a basic e-commerce application named **ShoppyGlobe** to explore core React concepts and best practices.

---

## **Project Requirements**

### **Component Structure**
- **App**: The main component of the application.
- **Header**: Displays the navigation menu and shopping cart icon.
- **ProductList**: Displays a list of products.
- **ProductItem**: Represents a single product, including an **"Add to Cart"** button.
- **ProductDetail**: Displays detailed information about a selected product.
- **Cart**: Displays items added to the cart with options to modify quantities or remove items.
- **CartItem**: Represents a single item in the cart.
- **NotFound**: Displays a 404 page for unknown routes.

### **Props**
- Use props to pass data between parent and child components.
- Ensure components are functional and reusable with appropriate prop types.

### **Data Fetching with `useEffect`**
- **ProductList Component**:
  - Use `useEffect` to fetch a list of products from the API: [`https://dummyjson.com/products`](https://dummyjson.com/products).
  - Store the fetched data in the component’s state.
  - Create a custom hook for fetching the product list. 
- **ProductDetail Component**:
  - Use `useEffect` to fetch product details based on route parameters.
  - Store the fetched data in the component’s state.
- **Error Handling**:
  - Implement error handling for failed data fetch requests.

### **State Management**
- **Redux**:
  - Implement Redux for complex state management.
  - Create actions, reducers, and selectors for managing cart item states.
- **Search Feature**:
  - Add a search feature to filter products in the `ProductList` component.

### **Event Handling**
- Add a button in `ProductItem` to add products to the cart.
- Add a button in `CartItem` to remove products from the cart.
- Ensure the functionality for adding and removing products works correctly using Redux.

### **React Routing**
- Implement routing using **React Router**.
- Create routes for:
  - **Home**
  - **Product Detail**
  - **Cart**
  - **Checkout**
- Use route parameters for product details.

### **React Lists**
- Render the list of products in the `ProductList` component.
- Render the list of cart items in the `Cart` component.
- Provide a unique key for each list item.

### **Performance Optimization**
- Use **React.lazy** and **Suspense** for code splitting and lazy loading components.

### **Styling**
- Apply CSS for styling the application.
- Ensure the application is responsive and works well across different screen sizes.

---

## **Submission Guidelines**
1. Ensure your application runs without errors. 
2. Use proper indentation and include comments to explain your code. 
3. Submit a link to your GitHub repository with the completed project.

---

## **Tools & Libraries**
- **React.js**
- **Redux** for state management
- **React Router** for routing
- **CSS** for styling
- **React.lazy** and **Suspense** for performance optimization

---

## **API Reference**
- [DummyJSON Products API](https://dummyjson.com/products)

---

## **Evaluation Criteria**
| **Category**                | **Marks** |
|-----------------------------|-----------|
| Component Structure         | 20        |
| Props                       | 10        |
| Data Fetching               | 40        |
| State Management            | 70        |
| Event Handling              | 20        |
| React Routing               | 20        |
| React Lists                 | 10        |
| Performance Optimization    | 20        |
| Styling                     | 20        |
| Submission Guidelines       | 20        |
| **Total**                   | **250**   |
