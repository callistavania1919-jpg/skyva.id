// SKYVA — Logic and interactivity 🌤️

// ====== NAVIGATION PANEL ======
const menuButtons = document.querySelectorAll(".menu-btn");
const panels = document.querySelectorAll(".panel");

menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    menuButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.panel;
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// ====== DARK / LIGHT MODE ======
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  modeToggle.textContent = dark ? "🌙 Gelap" : "☀️ Terang";
  localStorage.setItem("mode", dark ? "dark" : "light");
});

// Simpan mode user
if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark");
  modeToggle.textContent = "🌙 Gelap";
}

// ====== TRANSAKSI ======
const txForm = document.getElementById("txForm");
const txList = document.getElementById("txList");
const saldoEl = document.getElementById("saldo");
const pemasukanEl = document.getElementById("pemasukan");
const pengeluaranEl = document.getElementById("pengeluaran");

let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

// Tambah transaksi
txForm.addEventListener("submit", e => {
  e.preventDefault();
  const judul = document.getElementById("judul").value.trim();
  const jumlah = parseFloat(document.getElementById("jumlah").value);
  const tipe = document.getElementById("tipe").value;

  if (!judul || !jumlah) return alert("Isi semua data ya!");

  const tx = {
    id: Date.now(),
    judul,
    jumlah,
    tipe
  };
  transaksi.push(tx);
  localStorage.setItem("transaksi", JSON.stringify(transaksi));
  txForm.reset();
  renderTransaksi();
  updateSummary();
});

// Render transaksi
function renderTransaksi() {
  txList.innerHTML = "";
  transaksi.forEach(tx => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="tx-title">
        <span class="emoji">${tx.tipe === "income" ? "💰" : "🛍️"}</span>
        <span>${tx.judul}</span>
      </div>
      <div class="tx-amount ${tx.tipe}">
        ${tx.tipe === "income" ? "+" : "-"}Rp ${tx.jumlah.toLocaleString("id-ID")}
      </div>
    `;
    txList.appendChild(li);
  });
}
renderTransaksi();

// Update ringkasan saldo
function updateSummary() {
  let saldo = 0, income = 0, expense = 0;
  transaksi.forEach(tx => {
    if (tx.tipe === "income") income += tx.jumlah;
    else expense += tx.jumlah;
  });
  saldo = income - expense;

  saldoEl.textContent = "Rp " + saldo.toLocaleString("id-ID");
  pemasukanEl.textContent = "Rp " + income.toLocaleString("id-ID");
  pengeluaranEl.textContent = "Rp " + expense.toLocaleString("id-ID");
}
updateSummary();

// ====== TABUNGAN ======
const saveForm = document.getElementById("saveForm");
const totalTabunganEl = document.getElementById("totalTabungan");

let tabungan = parseFloat(localStorage.getItem("tabungan")) || 0;

saveForm.addEventListener("submit", e => {
  e.preventDefault();
  const jumlah = parseFloat(document.getElementById("saveAmount").value);
  if (!jumlah) return aler
