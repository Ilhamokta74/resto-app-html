document.getElementById('downloadButton').addEventListener('click', function () {
    // Gantilah 'contoh_file.txt' dengan nama file yang ingin Anda unduh
    var fileName = 'CV_Ilham Oktavian.pdf';

    // Membuat URL untuk file yang sudah ada
    var url = '../Media/CV/' + fileName; // Gantilah dengan path yang sesuai

    // Membuat elemen <a> untuk mengunduh file
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Menambahkan elemen <a> ke DOM dan mengkliknya untuk mengunduh file
    document.body.appendChild(a);
    a.click();

    // Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "CV Sedang Di Persiapkan",
    //     showConfirmButton: false,
    //     timer: 1500
    // });

    // Menghapus elemen <a> setelah selesai diunduh
    document.body.removeChild(a);
});


