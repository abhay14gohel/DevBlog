# DevBlog

DevBlog is a full-stack web application for managing a blog platform. It is built using Java Spring Boot for the backend and React for the frontend.

## Features

- **User Management**: Create, update, and delete user accounts.
- **Post Management**: Create, edit, and delete blog posts.
- **Category Management**: Organize posts into different categories.
- **Comment System**: Allow users to comment on posts.
- **Responsive UI**: User-friendly interface that adapts to various screen sizes.

## Technologies Used

- **Backend**:
  - Java Spring Boot
  - Spring Data JPA
  - Spring MVC
  - SQL Database (for development)
  
- **Frontend**:
  - React
  - Tailwind CSS
  - Vite (for development)

## Setup

1. **Backend**:
   - Clone the repository.
   - Navigate to the `DevBlog` directory.
   - Open the backend project in your preferred IDE.
   - Set up your database configuration in `application.properties`.
   - Run the Spring Boot application.

2. **Frontend**:
   - Navigate to the `frontend` directory.
   - Install dependencies using `npm install`.
   - Start the development server with `npm start`.

## Folder Structure

- **Backend**: Contains Java Spring Boot application.
  - `src/main/java/com/devblog`: Backend Java source code.
    - `DevBlogApplication.java`: Main Spring Boot application class.
    - `controllers`: Contains controller classes for handling HTTP requests.
      - `CategoryController.java`
      - `CommentController.java`
      - `PostController.java`
      - `UserController.java`
    - `entities`: Contains entity classes representing database tables.
      - `Category.java`
      - `Comment.java`
      - `Post.java`
      - `User.java`
    - `exception`: Contains custom exception classes.
      - `GlobalExceptionHandler.java`
      - `InvalidDetailsException.java`
      - `ResourceNotFoundException.java`
      - `UserNotFoundException.java`
    - `payloads`: Contains DTO (Data Transfer Object) classes.
      - `ApiResponse.java`
      - `CategoryDto.java`
      - `CommentDto.java`
      - `PostDto.java`
      - `PostResponse.java`
      - `UserDto.java`
      - `UserLogin.java`
    - `repositories`: Contains repository interfaces for database operations.
      - `CategoryRepo.java`
      - `CommentRepo.java`
      - `PostRepo.java`
      - `UserRepo.java`
    - `services`: Contains service interfaces and their implementations.
      - `CategoryService.java`
      - `CommentService.java`
      - `PostService.java`
      - `UserService.java`
      - `impl`: Contains implementation classes for service interfaces.
        - `CategoryServiceImpl.java`
        - `CommentServiceImpl.java`
        - `PostServiceImpl.java`
        - `UserServiceImpl.java`
- **Frontend**: Contains frontend application.
  - `index.html`: Entry point HTML file for the frontend.
  - `public`: Static assets and public files.
    - `devblog.png`, `devblog_logo.png`: Images used in the frontend.
    - `landing.jpg`, `ok.avif`, `ok.jpg`, `ok1.jpeg`, `vite.svg`: Other static files.
  - `src`: Source code directory.
    - `App.css`, `App.jsx`: Styles and main component of the frontend application.
    - `Components`: Reusable UI components.
      - `Abc.jsx`
      - `CreatePost.jsx`
      - `EditPost.jsx`
      - `Error.jsx`
      - `LandingPage.jsx`
      - `MyPosts.jsx`
      - `Navbar.jsx`
      - `Post.jsx`
      - `Posts.jsx`
      - `SignIn.jsx`
      - `SignUp.jsx`
    - `State`: Contains Redux or similar state management setup.
      - `User`
        - `userAction.jsx`
        - `userReducer.jsx`
        - `userTypes.jsx`
      - `rootReducer.jsx`
      - `store.jsx`
    - `assets`: Images and other static assets.
      - `devblog.png`, `devblog_logo.png`: Images used in the frontend.
      - `ok.avif`, `react.svg`: Other static files.
    - `index.css`, `main.jsx`: Entry point CSS and JavaScript files respectively.

## Usage

- Visit the frontend URL in your web browser to access the DevBlog application.
- Register a new account or log in with existing credentials.
- Explore posts, categories, and comments.
- Create new posts or comment on existing ones.

## Missing Features

- **Sorting**: Frontend do not currently support sorting functionality for posts.
- **Pagination**: Pagination is not implemented in frontend limiting the number of items returned in a single request.
- **Additional APIs**: Some common APIs like search or user profile management is not implemented in frontend.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For any inquiries or support, please contact Abhay J Gohel at abhaygohel777@gmail.com.


## Authors

- [@Abhay Gohel](https://github.com/abhay14gohel)
