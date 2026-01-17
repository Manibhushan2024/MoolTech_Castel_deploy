const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder function
function createSVGPlaceholder(text, filename, width = 800, height = 600) {
  const colors = ['#0066cc', '#FF6B35', '#004E89', '#F7931E', '#1ABC9C', '#E74C3C'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${randomColor}"/>
  <text x="50%" y="50%" font-size="48" font-family="Arial, sans-serif" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">
    ${text}
  </text>
  <text x="50%" y="60%" font-size="24" font-family="Arial, sans-serif" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.8">
    ${width}x${height}
  </text>
</svg>`;

  return svg;
}

// Create directories if they don't exist
const dirs = [
  'public/images/logo',
  'public/images/home',
  'public/images/services',
  'public/images/products',
  'public/images/projects',
  'public/images/about',
  'public/images/office',
  'public/images/testimonials'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create logo
fs.writeFileSync('public/images/logo/castle-elevator-logo.svg', 
  createSVGPlaceholder('Castle Elevator', 'logo', 200, 100));

// Create home/hero slider images
const heroImages = [
  'Elevator Installation',
  'Maintenance Service',
  'Modernization',
  'Safety First'
];

heroImages.forEach((text, i) => {
  fs.writeFileSync(`public/images/home/hero-${i + 1}.svg`, 
    createSVGPlaceholder(text, `hero-${i + 1}`, 1200, 600));
});

// Create service images
const services = [
  'Installation Service',
  'Preventive Maintenance',
  'Elevator Modernization',
  'Emergency Support',
  'Inspection Service',
  'Consultation'
];

services.forEach((text, i) => {
  fs.writeFileSync(`public/images/services/service-${i + 1}.svg`, 
    createSVGPlaceholder(text, `service-${i + 1}`, 600, 400));
});

// Create product images
const products = [
  'Passenger Elevators',
  'Freight Elevators',
  'Home Elevators',
  'Escalators',
  'Dumbwaiters'
];

products.forEach((text, i) => {
  fs.writeFileSync(`public/images/products/product-${i + 1}.svg`, 
    createSVGPlaceholder(text, `product-${i + 1}`, 600, 400));
});

// Create project images
const projects = [
  'Commercial Building A',
  'Residential Complex B',
  'Hospital Installation',
  'Shopping Mall Project',
  'Office Tower',
  'Hotel Modernization'
];

projects.forEach((text, i) => {
  fs.writeFileSync(`public/images/projects/project-${i + 1}.svg`, 
    createSVGPlaceholder(text, `project-${i + 1}`, 600, 400));
});

// Create about images
fs.writeFileSync('public/images/about/about-company.svg', 
  createSVGPlaceholder('About CastleElevator', 'about', 800, 600));

// Create office images
const officeImages = [
  'Head Office',
  'Service Center',
  'Warehouse',
  'Training Center'
];

officeImages.forEach((text, i) => {
  fs.writeFileSync(`public/images/office/office-${i + 1}.svg`, 
    createSVGPlaceholder(text, `office-${i + 1}`, 600, 400));
});

// Create testimonial images
const testimonials = [
  'Rajesh Kumar',
  'Priya Mehta',
  'Amit Singh',
  'Neha Kapoor'
];

testimonials.forEach((text, i) => {
  fs.writeFileSync(`public/images/testimonials/testimonial-${i + 1}.svg`, 
    createSVGPlaceholder(text, `testimonial-${i + 1}`, 400, 400));
});

console.log('✅ All placeholder images created successfully!');
