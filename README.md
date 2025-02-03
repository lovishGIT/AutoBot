# Automation Tool

## Description
This project is an automation tool designed to streamline repetitive tasks and improve productivity. It is built with efficiency and ease of use in mind.

## Features
- Task scheduling
- Automated notifications
- Customizable workflows
- Integration with various APIs

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/automation-tool.git
    ```
2. Navigate to the project directory:
    ```sh
    cd automation-tool
    ```
3. Setup .env file with the following variables:
    For Frontend:
    ```sh
    VITE_API_URL= # BACKEND API URL
    NODE_ENV = development
    ```

    For Backend:
    ``` sh
    PORT= 4000 # PORT
    JWT_SECRET= # JWT SECRET
    MONGODB_URI= # MONGODB URI
    CLIENT_URL= # FRONTEND URL

    CLOUDINARY_CLOUD_NAME = # Your cloudinary cloud name
    CLOUDINARY_API_KEY = # Your cloudinary api key
    CLOUDINARY_API_SECRET = # Your cloudinary api secret

    CLOUDINARY_FOLDER = # Your cloudinary folder name

    SERVICE_TYPE =  # gmail or ethereal
    USER_EMAIL = # create a gmail or ethereal service for mails
    USER_PASSWORD = # get your password
    ```

4. Install the dependencies:
    FRONTEND:
        ```sh
        cd frontend
        npm install
        ```
    BACKEND:
        ```sh
        cd backend
        npm install
        ```

5. Start the development server:
    FRONTEND:
        ```sh
        npm run dev
        ```
    BACKEND:
        ```sh
        npm run dev
        ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.
7. Testing for API can be done via Postman or Insomnia or Thunder Client at `http://localhost:4000`.


## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, please open an issue or contact the project maintainer at [lovish bansal](mailto:lovishbansal441@gmail.com).
