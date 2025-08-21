# Men's Garments Bill Generator

A professional web-based bill generator designed specifically for retail men's garments shops. This tool helps you create, manage, and print bills/receipts quickly and efficiently.

## Features

- **Easy Item Management**: Add garments with category, size, price, and quantity
- **Professional Receipts**: Generate print-ready bills with shop branding
- **GST Calculation**: Automatic 18% GST calculation
- **Save & Resume**: Auto-save bills and resume later
- **Export Options**: Export bills to CSV format
- **Mobile Responsive**: Works on all devices
- **Keyboard Shortcuts**: Quick operations with keyboard shortcuts

## How to Use

1. **Open the Application**: Simply open `index.html` in any web browser
2. **Setup Shop Details**: Enter your shop name, address, and contact details
3. **Add Customer Info**: Enter customer name and phone number
4. **Add Items**: Select category, enter item description, price, quantity, and size
5. **Generate Bill**: Click "Generate Bill" to print or save
6. **Save Bills**: Bills are automatically saved locally

## Categories Available

- Shirts
- T-Shirts
- Jeans
- Trousers
- Shorts
- Jackets
- Suits
- Shoes

## Keyboard Shortcuts

- **Ctrl + Enter**: Add item to bill
- **Ctrl + P**: Generate and print bill

## File Structure

```
bill-generator/
├── index.html          # Main application
├── styles.css          # Styling and responsive design
├── script.js          # JavaScript functionality
└── README.md          # This documentation
```

## Customization

### Change GST Rate
Edit line 45 in `script.js`:
```javascript
const gst = subtotal * 0.18; // Change 0.18 to your GST rate
```

### Add New Categories
Edit the `<select>` options in `index.html` under "itemCategory"

### Change Currency Symbol
Replace all ₹ symbols in `index.html` and `script.js` with your preferred currency

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## No Installation Required

This is a pure HTML/CSS/JavaScript application that runs entirely in your browser. No server setup or installation needed.

## Data Storage

- Bills are saved locally in browser storage
- No data is sent to any server
- Clear browser cache to remove saved data

## Support

For any issues or customization requests, refer to the code comments or modify as per your requirements.
