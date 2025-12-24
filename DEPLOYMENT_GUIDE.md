# How to Deploy Your Portfolio to Netlify

You have two main options to deploy your site. **Method 1** is the fastest (takes 30 seconds). **Method 2** is better for long-term maintenance.

## Method 1: Drag & Drop (Fastest) 🚀

This is the easiest way to get your site online immediately.

1.  Log in to your [Netlify account](https://app.netlify.com/).
2.  Go to the **"Sites"** tab (or "Team overview").
3.  You will see a box that says **"Drag and drop your site output folder here"**.
4.  Open your File Explorer on your computer to:
    `C:\gpt\RLC_optimization3\`
5.  Drag the entire **`portfolio`** folder and drop it into that box on the Netlify website.
6.  Netlify will upload and deploy it instantly.
7.  **Done!** You will get a random URL (like `gentle-sunflower-123456.netlify.app`).
    *   Click "Site settings" > "Change site name" to customize it (e.g., `ahmed-kamel-portfolio.netlify.app`).

---

## Method 2: Git & GitHub (Professional / Recommended) 🛠️

This method sets up "Continuous Deployment". Every time you save changes and push to GitHub, Netlify updates your site automatically.

### Part A: Put your code on GitHub

1.  **Open Terminal** in your portfolio folder:
    *   Open your terminal/command prompt.
    *   Navigate to your folder:
        ```bash
        cd C:\gpt\RLC_optimization3\portfolio
        ```

2.  **Initialize Git**:
    Run these commands one by one:
    ```bash
    git init
    git add .
    git commit -m "Initial portfolio launch"
    ```

3.  **Create a Repository on GitHub**:
    *   Go to [github.com/new](https://github.com/new).
    *   Repository name: `my-portfolio` (or similar).
    *   Make it **Public**.
    *   Click **Create repository**.

4.  **Connect and Push**:
    *   Copy the 3 lines under "…or push an existing repository from the command line" provided by GitHub. They look like this (replace `YOUR_USERNAME` with your actual GitHub username):
        ```bash
        git branch -M main
        git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
        git push -u origin main
        ```
    *   Run those commands in your terminal.

### Part B: Connect Netlify

1.  Log in to [Netlify](https://app.netlify.com/).
2.  Click **"Add new site"** > **"Import from an existing project"**.
3.  Select **"GitHub"**.
4.  Authorize Netlify to access your GitHub account.
5.  Search for and select your `my-portfolio` repository.
6.  **Build settings**:
    *   **Base directory**: (Leave empty)
    *   **Publish directory**: (Leave empty or type `.`) - *Since your index.html is at the root.*
7.  Click **"Deploy my-portfolio"**.

---

## Final Polish ✨

### Custom Domain (Optional)
If you buy a domain name (like `ahmedkamel.com`), you can connect it in Netlify under **Site settings > Domain management**.

### PDF Resume
Don't forget to replace the "Coming Soon" resume link in `index.html` once you have your PDF file!
1.  Save your resume as `resume.pdf`.
2.  Put it in the `portfolio/assets/` folder.
3.  Update the link in `index.html`:
    ```html
    <a href="assets/resume.pdf" target="_blank" ...>
    ```
