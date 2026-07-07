WB Hub — PWA Deploy Pack
========================
วางไฟล์ทั้งหมดนี้ในโฟลเดอร์เดียวกันของ repo (ระดับเดียวกับ index.html)

ไฟล์ในชุดนี้:
  index.html            หน้าเว็บ (login WB Hub + โลโก้ วว. + PWA)
  manifest.json         ข้อมูลแอป (ชื่อ WB Hub, สีธีม, เต็มจอ)
  service-worker.js     cache ออฟไลน์
  icon-192.png          ไอคอนแอป
  icon-512.png          ไอคอนแอป
  icon-maskable-512.png ไอคอนสำหรับ Android
  .nojekyll             บอก GitHub Pages ไม่ต้องประมวลผลไฟล์

*** ต้องเพิ่มเอง (ไม่ได้อยู่ในชุดนี้) ***
  thai-address.js   ← ไฟล์ข้อมูลที่อยู่ไทยของโปรเจกต์เดิม
                       index.html เรียกใช้ (บรรทัด: <script src="thai-address.js">)
                       ถ้าไม่มี → เลือกตำบล/อำเภออัตโนมัติไม่ได้ (แต่กรอกเองได้)
                       ชื่อไฟล์ต้องพิมพ์เล็กทั้งหมด: thai-address.js (GitHub case-sensitive)

วิธี deploy:
  1) อัปไฟล์ทั้งหมด (+ thai-address.js) เข้า repo
  2) Settings > Pages > Deploy from branch > เลือก branch > Save
  3) เปิด URL github.io บนมือถือ (https)
  4) iPhone: Safari > แชร์ > เพิ่มลงในหน้าจอโฮม
     Android: Chrome > เมนู > ติดตั้งแอป
  5) ได้ไอคอน WB Hub บนจอโฮม เปิดเต็มจอ

*** อย่าลืมฝั่ง backend ***
  วาง WasteBank_TISTR_backend_perf_V2_3_STEP3.gs ใน Apps Script
  แล้ว Deploy > New version (ไม่งั้น /exec ยังรันโค้ดเก่า)
