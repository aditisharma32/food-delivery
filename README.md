# Food Delivery Web App

This is a full-stack food delivery web application built using:  
- **Frontend**: React  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Atlas)  

## Live Demo  
- **Admin Panel**: [https://food-delivery-admin-f5aa.onrender.com/](https://food-delivery-admin-f5aa.onrender.com/)  
  Manage orders, inventory, and track the overall status of the food delivery system.  
  
- **Customer Application**: [https://food-delivery-app-cf9m.onrender.com/](https://food-delivery-app-cf9m.onrender.com/)  
  Browse food items, place orders, and track order status.

## Project Overview  
This full-stack food delivery application allows users to browse, search, and order food items seamlessly. The application is designed with three major components:  
1. **Frontend Website**: Built using React, providing an intuitive interface for customers to explore food options and place orders.  
2. **Admin Panel**: Allows admin users to manage orders, update inventory, and track food delivery status in real time.  
3. **Backend Server**: Implements RESTful APIs to manage user authentication, food data, and payment processing.  

### Key Features:  
- **User Authentication**:  
  - Secure login and registration system.  
  - Password encryption to protect user data.  
- **Shopping Cart**:  
  - Add food items to the cart and proceed to checkout.  
  - Real-time cart updates.  
- **Payment Integration**:  
  - Integrated with **Stripe Payment Gateway** for secure online transactions.  
- **Order Management**:  
  - Users can track their order status in real-time.  
  - Admin can update the status of orders via the admin panel.  
- **Responsive Design**:  
  - Works seamlessly on desktops, tablets, and mobile devices.  
- **RESTful API Design**:  
  - Robust API endpoints for all operations, ensuring scalability.  

### Technologies Used  
- **Frontend**: React, Vite, HTML, CSS  
- **Backend**: Node.js, Express  
- **Database**: MongoDB Atlas  
- **Payment Gateway**: Stripe  
- **Hosting**: Render  

## Setup Instructions  
### 1. Install Dependencies  
Run the following command in all three directories:  
- Frontend  
- Backend  
- Admin Panel  

```bash  
npm install  

```

### 2. Google Drive API Integration with Firebase

#### Steps to Set Up

1. **Create Service Account in Firebase Console**  
   - Go to the Firebase Console, navigate to **Project Settings** > **Service Accounts** and create a service account.

2. **Enable Google Drive API in the Google Cloud Console**  
   - Visit [Google Cloud Console](https://console.cloud.google.com/), go to **APIs & Services** > **Library**, search for Google Drive API, and enable it.

3. **Generate and Download Credentials (JSON Key) for the Service Account**  
   - In the Google Cloud Console, navigate to **IAM & Admin** > **Service Accounts**, and download the private key (JSON file) for your service account.

4. **Set Up Authentication in Your Application Using the Service Account Credentials**  
   - Use the `googleapis` library in your app to authenticate with the service account credentials.

5. **Use Google Drive API to Upload and Manage Media Files**  
   - Utilize the Google Drive API to upload, list, and manage media files (e.g., images) stored on your Google Drive.


### 2. Configure Environment Variables
For the backend, create a .env file in the root of the backend directory and add the following:

```bash  
JWT_SECRET=<your-jwt-secret>  
MONGO_URI=<your-mongodb-connection-string>
GOOGLE_TYPE=<use-private-key.json-file>
GOOGLE_PROJECT_ID=<use-private-key.json-file>
GOOGLE_PRIVATE_KEY_ID=<use-private-key.json-file>
GOOGLE_PRIVATE_KEY=<use-private-key.json-file>
GOOGLE_CLIENT_ID=<use-private-key.json-file>
GOOGLE_AUTH_URI=<use-private-key.json-file>
GOOGLE_TOKEN_URI=<use-private-key.json-file>
GOOGLE_AUTH_PROVIDER_CERT_URL=<use-private-key.json-file>
GOOGLE_CLIENT_CERT_URL=<use-private-key.json-file>
GOOGLE_UNIVERSE_DOMAIN=<use-private-key.json-file>


```

### 4. Run the Projects
To run the application locally, follow these steps:  

- **Frontend**:  
  Navigate to the `frontend` directory and run:
  ```bash
  npm run dev
  ```

- **Backend**:  
  Navigate to the `backend` directory and run:
  ```bash
  npm run server
  ```

- **Admin Panel**:  
  Navigate to the `admin` directory and run:
  ```bash
  npm run dev
  ```

## Future Enhancements

1. **Add Product Stock Limit**  
   Introduce a feature to limit the number of products available for sale. If the sales exceed this value, the product will be removed from the list and marked as unavailable.

2. **Forgot Password Feature**  
   Implement a "Forgot Password" feature to allow users to reset their passwords securely.

3. **Two-Factor Authentication (2FA)**  
   Enhance account security by adding two-factor authentication for user logins.

4. **Payment Integration**  
   Include additional payment options for a seamless checkout experience.

5. **Developer Details in Footer**  
   Add developer contact details or credits in the footer for better acknowledgment and user support.

6. **Real-Time Delivery Tracking**  
   Implement real-time delivery tracking with GPS to improve the customer experience.

7. **Order Notifications**  
   Add email and SMS notifications for order updates to keep users informed at every stage.

8. **Mobile App Development**  
   Build a mobile app for Android and iOS platforms using React Native to expand accessibility.


## Contributions

Contributions to this project are highly welcome! Here's how you can contribute:  

1. **Fork the Repository**  
   Create a copy of this repository in your GitHub account.  

2. **Create a Feature Branch**  
   Work on your changes in a dedicated feature branch to keep the main branch clean and stable.  

3. **Submit a Pull Request**  
   Once your changes are complete, submit a pull request with a detailed explanation of your updates or features added.  

4. **Open an Issue**  
   Before making significant changes, open an issue to discuss potential improvements or new feature ideas with the project maintainers.  

Feel free to collaborate and help improve this project!