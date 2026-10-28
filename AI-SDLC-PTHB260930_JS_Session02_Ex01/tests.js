describe("1. Kiểm thử hàm calcLineTotal(unitPrice, quantity)", () => {
  it("Test 1: Ép kiểu chuỗi số và tính đúng thành tiền ('450000', '2' -> 900000)", () => {
    const result = calcLineTotal("450000", "2");
    expect(result).toBe(900000);
  });

  it("Test 2: Tính đúng thành tiền với tham số là kiểu số nguyên (100000, 3 -> 300000)", () => {
    const result = calcLineTotal(100000, 3);
    expect(result).toBe(300000);
  });

  it("Test 3: Trả về null khi đơn giá <= 0, rỗng hoặc chứa chữ cái (0, âm, 'abc')", () => {
    expect(calcLineTotal(0, 2)).toBeNull();
    expect(calcLineTotal(-50000, 2)).toBeNull();
    expect(calcLineTotal("abc", 2)).toBeNull();
    expect(calcLineTotal("", 2)).toBeNull();
    expect(calcLineTotal("   ", 2)).toBeNull();
  });

  it("Test 4: Trả về null khi số lượng không phải số nguyên từ 1 trở lên (0, âm, số thập phân, chữ)", () => {
    expect(calcLineTotal(450000, 0)).toBeNull();
    expect(calcLineTotal(450000, -1)).toBeNull();
    expect(calcLineTotal(450000, 1.5)).toBeNull();
    expect(calcLineTotal(450000, "abc")).toBeNull();
    expect(calcLineTotal(450000, "")).toBeNull();
  });
});

describe("2. Kiểm thử hàm calcVat(amount)", () => {
  it("Test 5: Tính đúng thuế VAT 8% cho số tiền hợp lệ (100000 -> 8000; 900000 -> 72000)", () => {
    expect(calcVat(100000)).toBe(8000);
    expect(calcVat(900000)).toBe(72000);
    expect(calcVat("500000")).toBe(40000);
  });

  it("Test 6: Trả về null khi số tiền âm, rỗng hoặc không phải là số hợp lệ", () => {
    expect(calcVat(-1000)).toBeNull();
    expect(calcVat("abc")).toBeNull();
    expect(calcVat("")).toBeNull();
    expect(calcVat("   ")).toBeNull();
  });
});

describe("3. Kiểm thử hàm formatVnd(amount)", () => {
  it("Test 7: Định dạng số tiền có dấu chấm phân cách hàng nghìn (1250000 -> '1.250.000 đ')", () => {
    expect(formatVnd(1250000)).toBe("1.250.000 đ");
    expect(formatVnd(900000)).toBe("900.000 đ");
    expect(formatVnd(72000)).toBe("72.000 đ");
  });

  it("Test 8: Định dạng số tiền nhỏ dưới 1.000 đ và số 0 (950 -> '950 đ', 0 -> '0 đ')", () => {
    expect(formatVnd(950)).toBe("950 đ");
    expect(formatVnd(0)).toBe("0 đ");
  });
});

describe("4. Kiểm thử hàm buildReceiptLine(name, unitPrice, quantity)", () => {
  it("Test 9: Cắt khoảng trắng ở tên sản phẩm và dựng đúng mẫu dòng phiếu thanh toán", () => {
    const receipt = buildReceiptLine(" Tai nghe Bluetooth ", 450000, 2);
    expect(receipt).toBe("Tai nghe Bluetooth x2: 900.000 đ + VAT 72.000 đ = 972.000 đ");
  });

  it("Test 10: Trả về đúng chuỗi cảnh báo khi tên sản phẩm trống hoặc chỉ có khoảng trắng", () => {
    expect(buildReceiptLine("", 450000, 2)).toBe("Dữ liệu dòng hàng không hợp lệ");
    expect(buildReceiptLine("   ", 450000, 2)).toBe("Dữ liệu dòng hàng không hợp lệ");
  });

  it("Test 11: Trả về đúng chuỗi cảnh báo khi đơn giá hoặc số lượng không hợp lệ", () => {
    expect(buildReceiptLine("Áo thun", "abc", 2)).toBe("Dữ liệu dòng hàng không hợp lệ");
    expect(buildReceiptLine("Áo thun", 450000, 0)).toBe("Dữ liệu dòng hàng không hợp lệ");
    expect(buildReceiptLine("Áo thun", 450000, -2)).toBe("Dữ liệu dòng hàng không hợp lệ");
    expect(buildReceiptLine("Áo thun", -100000, 1)).toBe("Dữ liệu dòng hàng không hợp lệ");
  });
});
