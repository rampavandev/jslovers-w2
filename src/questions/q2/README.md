### Problem Statement: E-commerce Clothing Filter Application

You are tasked with building an interactive e-commerce web page that allows users to filter a collection of clothing and accessories. The web page must display a list of products (clothing items such as T-shirts, jackets, shoes, etc.) and allow users to filter the products based on several criteria. The filtering options should include:

1. **Search**: Users should be able to search for products by name.
2. **Price Range**: Users should be able to filter products by specifying a maximum price.
3. **Stock Availability**: Users should have the option to display only products that are currently in stock.
4. **Rating**: Users should be able to filter products based on a minimum rating threshold (e.g., show products with a rating of 4.0 or higher).
5. **Additional Product Information**: Each product card should display detailed information, such as:
   - **Product Name**
   - **Category** (e.g., T-shirt, Jacket, Footwear)
   - **Price (₹)**: Prices should be displayed in Indian Rupees (₹).
   - **Stock Status**: Whether the product is in stock or out of stock.
   - **Material**: The fabric/material description of the product.
   - **Available Sizes**: The size options for each product.
   - **Product Image**: Display an image for each product.
   - **Rating**: Display a star rating out of 5 stars, showing both full and half stars as appropriate.

### Requirements:
1. Implement the filters using React. The list of products should dynamically update as the user interacts with the filters.
2. Use a JSON array to store the product data, with each product containing attributes such as `id`, `name`, `price`, `inStock`, `rating`, `image`, `category`, `size`, and `material`.
3. Design the product cards to display the above details, along with the ability to display star ratings correctly.
4. The filters should be displayed on the left-hand side, similar to e-commerce websites like Amazon.

The end goal is to create a clean, responsive web page that allows users to easily browse and filter clothing items according to their preferences.