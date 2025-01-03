# PurchezTech

The frontend for **PurchezTech**, an e-commerce platform offering a variety of electronic devices and accessories. Built with modern technologies to ensure a seamless user experience, including real-time data fetching, efficient state management, and responsive design.

---

## Features

- **Real-Time Data Fetching**: Utilizes RTK Query for efficient data fetching and caching.
- **State Management**: Managed using Redux Toolkit for a scalable and predictable app state.
- **Authentication**: Integration with Google OAuth for secure login.
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly and desktop-ready layouts.
- **Interactive UI**: Dynamic components powered by React and Swiper.

---

## Prerequisites

- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)

If you don’t have Yarn installed, you can add it by following these steps:

#### For macOS and Linux:

```bash
npm install -g yarn
```

#### For Windows:

Download and install Yarn from the [official Yarn website](https://classic.yarnpkg.com/en/docs/install).

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository_url>
cd purcheztech
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_BASE_URL=<your_api_base_url>
VITE_GOOGLE_CLIENT_ID=<your_google_client_id>
```

---

## Development

To start the development server, run:

```bash
yarn dev
```

The app will be accessible at `http://localhost:5173/` by default.

---

## Build for Production

To build the project for production, run:

```bash
yarn build
```

The production-ready files will be available in the `dist` directory.

---

## Preview Production Build

To preview the production build, run:

```bash
yarn preview
```

---

## Technologies Used

- **Frontend Framework**: React
- **State Management**: Redux Toolkit
- **Data Fetching**: RTK Query
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: Google OAuth
- **Icons**: React Icons

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature-name'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries or support, reach out to **TH Sakib**:

- GitHub: [@th-sakib](https://github.com/th-sakib)
- Email: [th.sakib@example.com](mailto:th.sakib@example.com)

