function calcLineTotal(unitPrice, quantity) {
  if (typeof unitPrice === "string" && unitPrice.trim() === "") {
    return null;
  }
  if (typeof quantity === "string" && quantity.trim() === "") {
    return null;
  }

  const parsedPrice = Number(unitPrice);
  const parsedQuantity = Number(quantity);

  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return null;
  }

  if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    return null;
  }

  return parsedPrice * parsedQuantity;
}

function calcVat(amount) {
  if (typeof amount === "string" && amount.trim() === "") {
    return null;
  }

  const parsedAmount = Number(amount);

  if (isNaN(parsedAmount) || parsedAmount < 0) {
    return null;
  }

  return Math.round(parsedAmount * 0.08);
}

function formatVnd(amount) {
  const parsedAmount = Number(amount);

  if (isNaN(parsedAmount) || parsedAmount < 0 || !Number.isInteger(parsedAmount)) {
    return "0 đ";
  }

  const formattedNumber = parsedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedNumber} đ`;
}

function buildReceiptLine(name, unitPrice, quantity) {
  if (typeof name !== "string" || name.trim() === "") {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  const lineTotal = calcLineTotal(unitPrice, quantity);
  if (lineTotal === null) {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  const vat = calcVat(lineTotal);
  if (vat === null) {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  const total = lineTotal + vat;

  const trimmedName = name.trim();
  const parsedQuantity = Number(quantity);

  return `${trimmedName} x${parsedQuantity}: ${formatVnd(lineTotal)} + VAT ${formatVnd(vat)} = ${formatVnd(total)}`;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const btnCalculate = document.getElementById("btn-calculate");
    const btnReset = document.getElementById("btn-reset");
    const nameInput = document.getElementById("product-name");
    const priceInput = document.getElementById("unit-price");
    const qtyInput = document.getElementById("quantity");
    const receiptBox = document.getElementById("receipt-result");

    if (btnCalculate && receiptBox) {
      btnCalculate.addEventListener("click", () => {
        const nameVal = nameInput ? nameInput.value : "";
        const priceVal = priceInput ? priceInput.value : "";
        const qtyVal = qtyInput ? qtyInput.value : "";

        const result = buildReceiptLine(nameVal, priceVal, qtyVal);
        receiptBox.textContent = result;

        if (result === "Dữ liệu dòng hàng không hợp lệ") {
          receiptBox.className = "receipt-box status-error";
        } else {
          receiptBox.className = "receipt-box status-success";
        }
      });
    }

    if (btnReset && receiptBox) {
      btnReset.addEventListener("click", () => {
        if (nameInput) nameInput.value = "";
        if (priceInput) priceInput.value = "";
        if (qtyInput) qtyInput.value = "";
        receiptBox.textContent = "Chưa có thông tin dòng hàng. Vui lòng nhập dữ liệu và bấm 'Tính tiền'.";
        receiptBox.className = "receipt-box status-empty";
      });
    }

    const sampleButtons = document.querySelectorAll(".sample-btn");
    sampleButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sampleName = btn.getAttribute("data-name");
        const samplePrice = btn.getAttribute("data-price");
        const sampleQty = btn.getAttribute("data-qty");

        if (nameInput) nameInput.value = sampleName;
        if (priceInput) priceInput.value = samplePrice;
        if (qtyInput) qtyInput.value = sampleQty;

        if (btnCalculate) btnCalculate.click();
      });
    });
  });
}

if (typeof global !== "undefined") {
  global.calcLineTotal = calcLineTotal;
  global.calcVat = calcVat;
  global.formatVnd = formatVnd;
  global.buildReceiptLine = buildReceiptLine;
}
