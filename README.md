# PLCR STUDIO

**AI-Powered Product Composition Tool** - Seamlessly composite products into photorealistic environments using Google's Gemini AI and Excalidraw's intuitive canvas interface.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash%20%7C%203%20Pro-orange)](https://ai.google.dev/)

## 🎯 Overview

PLCR STUDIO is a next-generation product visualization tool that combines the power of Google's Gemini AI with an intuitive annotation interface. Draw arrows and annotations on a canvas to indicate exactly where and how you want products placed in your environment images, and let AI handle the photorealistic compositing.

Perfect for:
- **Product Photography**: Create professional product shots without expensive photoshoots
- **E-commerce**: Generate multiple product placements for A/B testing
- **Marketing**: Quickly prototype product placement concepts
- **Interior Design**: Visualize furniture and decor in real spaces

## ✨ Features

### 🎨 **Intuitive Canvas Interface**
- **Drag & Drop**: Add images directly to dedicated Environment and Product frames
- **Annotation Tools**: Draw arrows, circles, and add text to guide AI placement
- **Layer Management**: Environment and product images automatically stay in back layers for easy annotation
- **Frame-Based Organization**: Separate frames for environment, products, and assets

### 🤖 **AI-Powered Generation**
- **Dual Model Support**:
  - **Gemini 2.5 Flash**: Fast generation at 1024px resolution
  - **Gemini 3 Pro**: Professional quality with 1K, 2K, and 4K output
- **Multiple Aspect Ratios**: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9
- **Smart Prompting**: AI enhances environment generation prompts for photorealism
- **Multi-Reference Support**: Use multiple product images for better understanding of the object

### 🔄 **Iterative Workflow**
- **Generate Environments**: Create photorealistic scenes from text descriptions
- **Compose Products**: Place products with precision using visual annotations
- **Iterate on Results**: Refine individual images with text prompts
- **Create Assets**: Generate standalone objects for later use

### 💾 **Export & Save**
- **Native Excalidraw Export**: Full export dialog with PNG/SVG options
- **Multiple Scales**: Export at 1x, 2x, or 3x resolution
- **Background Control**: Include or exclude canvas background
- **Embed Scene Data**: Optionally include Excalidraw data in exports

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Phantazy-Interactive/plcr-studio.git
   cd plcr-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Step 1: Select Your AI Model

Choose between:
- **Gemini 2.5 Flash** - Fast generation, 1024px output
- **Gemini 3 Pro** - Professional quality with quality options (1K/2K/4K)

### Step 2: Configure Generation Settings

- **Quality** (Pro model only): Choose 1K, 2K, or 4K output
- **Aspect Ratio**: Select from 10 different aspect ratios

### Step 3: Set Up Your Environment

**Option A: Generate Environment**
1. Click the "Generate Environment" button (image icon)
2. Describe the scene you want (e.g., "modern minimalist living room with large windows")
3. The AI will enhance your prompt and generate a photorealistic environment
4. The image is automatically placed in the Environment frame

**Option B: Upload Environment**
1. Drag and drop an image into the Environment frame
2. The image automatically positions at the back layer for annotations

### Step 4: Add Your Products

1. Drag and drop product images into the Product frame
2. Multiple product images help the AI understand the object better
3. Products automatically layer behind annotations

### Step 5: Annotate Placement

Use Excalidraw's tools to show the AI where to place products:
- **Arrows**: Point to exact placement locations
- **Circles**: Highlight areas of interest
- **Text**: Add specific instructions or notes

### Step 6: Generate Composition

1. Click the "Generate Image" button (sparkles icon)
2. The AI will:
   - Analyze your annotations
   - Understand product perspectives from multiple reference images
   - Composite the product into the scene
   - Match lighting, shadows, and perspective
3. The result appears on the canvas as a new image

### Step 7: Iterate & Refine

- **Right-click any image** to access context menu
- **"Iterate on Image"**: Refine an image with text prompts
- **"Save to Disk"**: Export using Excalidraw's full export dialog

## 🏗️ Project Structure

```
plcr-studio/
├── app/
│   ├── api/
│   │   ├── generate-environment/  # Environment generation endpoint
│   │   ├── iterate/               # Product composition endpoint
│   │   └── iterate-image/         # Single image iteration endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── components/
│   ├── CanvasWorkspace.tsx        # Main workspace orchestrator
│   ├── EnhancedExcalidrawCanvas.tsx # Canvas with AI integration
│   ├── InitialEnvironmentDialog.tsx # Environment setup dialog
│   └── IteratePromptDialog.tsx    # Iteration prompt dialog
├── hooks/
│   ├── useGenerationManager.ts    # Generation workflow management
│   └── useImageMetadata.ts        # Image tracking and classification
├── types/
│   └── canvas.ts                  # TypeScript type definitions
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key |

### API Routes

All API routes are server-side and located in `app/api/`:

- **POST /api/generate-environment** - Generate photorealistic environments from text
- **POST /api/iterate** - Compose products into environments with annotations
- **POST /api/iterate-image** - Modify existing images with text prompts

### Model Configuration

Models are configured in the UI dropdowns:

- **Gemini 2.5 Flash** (`gemini-2.5-flash-image`)
  - Fixed 1024px base resolution
  - Quality dropdown disabled
  - Fastest generation

- **Gemini 3 Pro** (`gemini-3-pro-image-preview`)
  - 1K, 2K, or 4K output
  - Quality dropdown enabled
  - Professional asset production

## 🎨 How It Works

### 1. **Image Classification**

Images are automatically classified based on their frame membership:
- **Environment**: Images in the Environment frame (placed at back layer)
- **Product**: Images in the Product frame (placed at back layer)
- **Asset**: Images outside frames (loose objects)
- **Generated**: AI-generated composition results

### 2. **Layer Management**

The system maintains a strict layer hierarchy:
```
[Frames] → [Environment Images] → [Product Images] → [Annotations & Other Elements]
```

This ensures annotations always appear on top of images for clear guidance.

### 3. **AI Composition Pipeline**

1. **Capture Canvas**: Export canvas to sketch image (with annotations)
2. **Resize Images**: Optimize images for API (sketch: 1024px, others: 2048px)
3. **Build Prompt**: Construct detailed instructions for the AI
4. **API Call**: Send to Gemini with image config (aspect ratio, quality)
5. **Render Result**: Add generated image to canvas

### 4. **Prompt Enhancement**

For environment generation, user prompts are enhanced with:
- Photography terminology (focal length, depth of field, bokeh)
- Lighting details (golden hour, soft light, shadows)
- Texture and material descriptions
- Composition guidelines (rule of thirds, leading lines)
- Quality emphasis (high resolution, sharp detail)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Reporting Bugs

1. **Search existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. **Check the roadmap** and existing feature requests
2. **Open an issue** with the `enhancement` label
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered
   - Example use cases

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/Phantazy-Interactive/plcr-studio.git
   cd plcr-studio
   git remote add upstream https://github.com/originalowner/plcr-studio.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Follow existing code style and conventions
   - Write clear, concise commit messages
   - Add comments for complex logic
   - Update documentation as needed

4. **Test thoroughly**
   ```bash
   npm run build  # Ensure builds successfully
   npm run dev    # Test in development mode
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve issue with layer ordering"
   ```

   Use conventional commit messages:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template with:
     - Description of changes
     - Related issue numbers
     - Testing performed
     - Screenshots (if UI changes)

### Development Guidelines

- **Code Style**: Follow the existing TypeScript/React patterns
- **File Organization**: Keep components modular and well-organized
- **Type Safety**: Use TypeScript types, avoid `any` when possible
- **Comments**: Add comments for complex logic, not obvious code
- **Performance**: Consider performance impact of changes
- **Accessibility**: Ensure UI changes are accessible

### Pull Request Review Process

1. **Automated Checks**: PR must pass build checks
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Recognition**: Contributors added to acknowledgments

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Technologies

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[Excalidraw](https://excalidraw.com/)** - Virtual whiteboard for sketching
- **[Google Gemini AI](https://ai.google.dev/)** - Multimodal AI for image generation
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Inspiration

This project was inspired by the need for accessible, AI-powered product visualization tools for small businesses and individual creators who can't afford expensive photoshoots.

## 📬 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Phantazy-Interactive/plcr-studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Phantazy-Interactive/plcr-studio/discussions)

---

**Made with ❤️ for the open-source community**

*Star ⭐ this repository if you find it helpful!*
