/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  generateBuildId: async () => {
      // This could be anything, using the latest git hash
      const gitHash = process.env.GIT_HASH || ''; // Default value if GIT_HASH is not set
      return String(gitHash); // Ensure that the value is a string
  },
}
 
export default nextConfig;
  