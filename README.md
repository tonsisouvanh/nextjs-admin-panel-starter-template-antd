# Next Admin Panel Starter Template

Welcome to the Next Admin Panel Starter Template! This project is designed to help you quickly set up an admin panel using modern technologies.

## Features

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Ant Design**: A popular UI library for building elegant user interfaces.
- **Prisma**: An ORM for seamless database interactions.
- **JOSE**: A library for JSON Object Signing and Encryption.
- **MySQL**: A reliable and widely-used relational database.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/next-admin-panel-starter-template.git
   cd next-admin-panel-starter-template
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Configuration

- **Database**: Configure your MySQL database connection in the `.env` file.
- **Authentication**: Set up your JOSE configuration for secure authentication.

## Folder Structure

- `/pages`: Contains the Next.js pages.
- `/components`: Reusable UI components.
- `/prisma`: Prisma schema and migrations.
- `/styles`: Tailwind CSS configuration and global styles.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Ant Design](https://ant.design/)
- [Prisma](https://www.prisma.io/)
- [JOSE](https://github.com/panva/jose)
- [MySQL](https://www.mysql.com/)
- [Tailwind CSS](https://tailwindcss.com/)
