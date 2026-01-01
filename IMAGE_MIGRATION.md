# Image Migration Guide for CastleElevator

## Current Status
- Images folder location: C:\Users\dell\Desktop\Mani_work\NuvolaElevator\Images
- Next.js public folder: C:\Users\dell\Desktop\Mani_work\castleelevator\public\images

## Step-by-Step Migration

### Step 1: Copy Image Folders
Run these PowerShell commands:

```powershell
cd C:\Users\dell\Desktop\Mani_work

# Copy home page images
Copy-Item "NuvolaElevator\Images\Home_page_images\*" -Destination "castleelevator\public\images\home" -Recurse -Force

# Copy services images
Copy-Item "NuvolaElevator\Images\Services_images\*" -Destination "castleelevator\public\images\services" -Recurse -Force

# Copy project images
Copy-Item "NuvolaElevator\Images\Project_images\*" -Destination "castleelevator\public\images\projects" -Recurse -Force

# Copy about/office images
Copy-Item "NuvolaElevator\Images\Office_images\*" -Destination "castleelevator\public\images\office" -Recurse -Force

# Copy testimonials images (if available)
Copy-Item "NuvolaElevator\Images\Client_review_images\*" -Destination "castleelevator\public\images\testimonials" -Recurse -Force

# Copy about section images (if available)
Copy-Item "NuvolaElevator\Images\About_images\*" -Destination "castleelevator\public\images\about" -Recurse -Force
```

### Step 2: Update Image References in Code

#### In products.json:
Change imagePath from:
```json
"imagePath": "/images/services/passenger.jpg"
```
To actual file names if different:
```json
"imagePath": "/images/services/your-actual-image.jpg"
```

#### In services.json:
Update imagePath references to match your actual service images

#### In projects.json:
Update imagePath to point to project images in /public/images/projects/

#### In React Components:
Update image references to use Next.js Image component:

```typescript
import Image from "next/image"

// Old (placeholder):
<div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>

// New (with actual image):
<Image
  src="/images/services/your-image.jpg"
  alt="Service name"
  width={500}
  height={300}
  className="w-full h-48 object-cover"
/>
```

### Step 3: Image Optimization

Install optional image optimization package:
```powershell
cd castleelevator
npm install sharp
```

### Step 4: File Structure After Migration

```
castleelevator/public/images/
 home/
    (all hero and home page images)
 services/
    (installation, maintenance, modernization images)
 projects/
    (project images: tech-tower, sunrise, metro-mall, green-gardens)
 about/
    (company story and office images)
 testimonials/
    (client review images - if available)
 office/
     (office/team photos)
```

### Step 5: Recommended Image Sizes

- Hero banner: 1920x600px (or larger)
- Service/Product cards: 500x300px
- Project images: 600x400px
- Testimonial avatars: 64x64px
- Office photos: 800x600px

### Step 6: Verify Images Load

After migration:
1. Run `npm run dev`
2. Open http://localhost:3000
3. Check browser console for image loading errors
4. Test on /products, /services, /projects pages

---

**Note:** If you don't have actual images yet, the app will work with placeholder colors. Replace them gradually as images become available.