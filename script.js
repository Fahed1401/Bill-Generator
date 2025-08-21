let billItems = [];
let billCounter = 1001;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('billNumber').value = 'BILL-' + billCounter;
    updateDateTime();
    loadSavedData();
});

function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN');
    const timeStr = now.toLocaleTimeString('en-IN');
    document.getElementById('printDate').textContent = dateStr + ' ' + timeStr;
}

function addItem() {
    const category = document.getElementById('itemCategory').value;
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const size = document.getElementById('itemSize').value;

    if (!category || !name || !price || !quantity) {
        alert('Please fill all required fields!');
        return;
    }

    const item = {
        id: Date.now(),
        category,
        name,
        price,
        quantity,
        size,
        total: price * quantity
    };

    billItems.push(item);
    renderBillItems();
    calculateTotals();
    clearItemForm();
}

function clearItemForm() {
    document.getElementById('itemCategory').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQuantity').value = '1';
    document.getElementById('itemSize').value = '';
}

function renderBillItems() {
    const tbody = document.getElementById('billItems');
    tbody.innerHTML = '';

    billItems.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.size || '-'}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>₹${item.total.toFixed(2)}</td>
            <td><button class="delete-btn" onclick="removeItem(${item.id})"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function removeItem(id) {
    billItems = billItems.filter(item => item.id !== id);
    renderBillItems();
    calculateTotals();
}

function calculateTotals() {
    const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    
    document.getElementById('printSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('printGst').textContent = gst.toFixed(2);
    document.getElementById('printTotal').textContent = total.toFixed(2);
}

function generateBill() {
    if (billItems.length === 0) {
        alert('Please add items to the bill!');
        return;
    }

    // Update print area
    document.getElementById('printShopName').textContent = document.getElementById('shopName').value;
    document.getElementById('printShopAddress').textContent = document.getElementById('shopAddress').value;
    document.getElementById('printShopPhone').textContent = 'Phone: ' + document.getElementById('shopPhone').value;
    document.getElementById('printBillNumber').textContent = document.getElementById('billNumber').value;
    document.getElementById('printCustomerName').textContent = document.getElementById('customerName').value || 'Walk-in Customer';
    document.getElementById('printCustomerPhone').textContent = document.getElementById('customerPhone').value || '-';
    
    // Render print items
    const printItems = document.getElementById('printItems');
    printItems.innerHTML = '';
    billItems.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name} (${item.category})</td>
            <td>${item.size || '-'}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.total.toFixed(2)}</td>
        `;
        printItems.appendChild(tr);
    });

    // Show print area and print
    const printArea = document.getElementById('printArea');
    printArea.style.display = 'block';
    
    window.print();
    
    // Hide after printing
    setTimeout(() => {
        printArea.style.display = 'none';
    }, 1000);
}

function clearBill() {
    if (confirm('Are you sure you want to clear all items?')) {
        billItems = [];
        renderBillItems();
        calculateTotals();
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        billCounter++;
        document.getElementById('billNumber').value = 'BILL-' + billCounter;
        localStorage.removeItem('savedBill');
    }
}

function saveBill() {
    if (billItems.length === 0) {
        alert('No items to save!');
        return;
    }

    const billData = {
        items: billItems,
        customerName: document.getElementById('customerName').value,
        customerPhone: document.getElementById('customerPhone').value,
        billNumber: document.getElementById('billNumber').value,
        shopName: document.getElementById('shopName').value,
        shopAddress: document.getElementById('shopAddress').value,
        shopPhone: document.getElementById('shopPhone').value,
        date: new Date().toISOString()
    };

    localStorage.setItem('savedBill', JSON.stringify(billData));
    alert('Bill saved successfully!');
}

function loadSavedData() {
    const saved = localStorage.getItem('savedBill');
    if (saved) {
        const billData = JSON.parse(saved);
        billItems = billData.items;
        document.getElementById('customerName').value = billData.customerName || '';
        document.getElementById('customerPhone').value = billData.customerPhone || '';
        document.getElementById('shopName').value = billData.shopName || 'Style Men\'s Wear';
        document.getElementById('shopAddress').value = billData.shopAddress || '123 Fashion Street, City';
        document.getElementById('shopPhone').value = billData.shopPhone || '9876543210';
        
        renderBillItems();
        calculateTotals();
    }
}

// Quick add buttons for common items
function quickAdd(category, name, price) {
    document.getElementById('itemCategory').value = category;
    document.getElementById('itemName').value = name;
    document.getElementById('itemPrice').value = price;
    document.getElementById('itemQuantity').value = 1;
    document.getElementById('itemSize').focus();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        addItem();
    }
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        generateBill();
    }
});

// Auto-save on changes
function autoSave() {
    if (billItems.length > 0) {
        const billData = {
            items: billItems,
            customerName: document.getElementById('customerName').value,
            customerPhone: document.getElementById('customerPhone').value,
            billNumber: document.getElementById('billNumber').value,
            shopName: document.getElementById('shopName').value,
            shopAddress: document.getElementById('shopAddress').value,
            shopPhone: document.getElementById('shopPhone').value,
            date: new Date().toISOString()
        };
        localStorage.setItem('savedBill', JSON.stringify(billData));
    }
}

// Add event listeners for auto-save
document.addEventListener('input', autoSave);
document.addEventListener('change', autoSave);

// Export to CSV
function exportToCSV() {
    if (billItems.length === 0) {
        alert('No items to export!');
        return;
    }

    let csv = 'Item,Category,Size,Quantity,Price,Total\n';
    billItems.forEach(item => {
        csv += `"${item.name}","${item.category}","${item.size || '-'}",${item.quantity},${item.price},${item.total}\n`;
    });
    
    const total = billItems.reduce((sum, item) => sum + item.total, 0);
    const gst = total * 0.18;
    const grandTotal = total + gst;
    
    csv += `\nSubtotal,${total.toFixed(2)}\n`;
    csv += `GST (18%),${gst.toFixed(2)}\n`;
    csv += `Total,${grandTotal.toFixed(2)}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill_${document.getElementById('billNumber').value}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Add export button to actions
document.addEventListener('DOMContentLoaded', function() {
    const actionsDiv = document.querySelector('.actions');
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn-secondary';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export CSV';
    exportBtn.onclick = exportToCSV;
    actionsDiv.appendChild(exportBtn);
});
