PurchezTech

The frontend for PurchezTech, an e-commerce platform offering a variety of electronic devices and accessories. Built with modern technologies to ensure a seamless user experience, including real-time data fetching, efficient state management, and responsive design.

Features

Real-Time Data Fetching: Utilizes RTK Query for efficient data fetching and caching.

State Management: Managed using Redux Toolkit for a scalable and predictable app state.

Authentication: Integration with Google OAuth for secure login.

Responsive Design: Built with Tailwind CSS for mobile-friendly and desktop-ready layouts.

Interactive UI: Dynamic components powered by React and Swiper.

Prerequisites

Node.js (v16 or higher)

Yarn (v1.22 or higher)

If you don’t have Yarn installed, you can add it by following these steps:

For macOS and Linux:

npm install -g yarn

For Windows:

Download and install Yarn from the official Yarn website.

Installation

1. Clone the Repository

git clone <repository_url>
cd purcheztech

2. Install Dependencies

yarn install

3. Environment Configuration

Create a .env file in the root directory and add the following variables:

VITE_API_BASE_URL=<your_api_base_url>
VITE_GOOGLE_CLIENT_ID=<your_google_client_id>

Development

To start the development server, run:

yarn dev

The app will be accessible at http://localhost:5173/ by default.

Build for Production

To build the project for production, run:

yarn build

The production-ready files will be available in the dist directory.

Preview Production Build

To preview the production build, run:

yarn preview

Technologies Used

Frontend Framework: React

State Management: Redux Toolkit

Data Fetching: RTK Query

Styling: Tailwind CSS, DaisyUI

Authentication: Google OAuth

Icons: React Icons

Contributing

We welcome contributions! To contribute:

Fork the repository

Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature-name')

Push to the branch (git push origin feature-name)

Open a Pull Request

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For inquiries or support, reach out to TH Sakib:

GitHub: @th-sakib

Email: th.sakib@example.com
