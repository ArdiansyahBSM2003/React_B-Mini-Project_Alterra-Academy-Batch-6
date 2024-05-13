# Fungsionalitas dari Folder Static

Folder static pada proyek Python digunakan untuk menyimpan file-file statis seperti gambar, file CSS, file JavaScript, dan file-file lain yang tidak berubah saat aplikasi dijalankan. Biasanya, folder ini digunakan dalam pengembangan web dengan framework seperti Django atau Flask.

Misalnya, jika Anda menggunakan framework Flask, Anda bisa menyimpan file-file statis seperti gambar, CSS, atau JavaScript dalam folder `static` di direktori proyek Anda. Ini memungkinkan Anda untuk merujuk ke file-file ini dari halaman web Anda tanpa harus menuliskan path absolut yang panjang.

### contoh struktur proyek Flask dengan folder static:

```
my_project/
    static/
        css/
            style.css
        js/
            script.js
        img/
            logo.png
    templates/
        index.html
    app.py
```

Dalam contoh di atas, `static` adalah folder yang berisi file-file statis seperti CSS, JavaScript, dan gambar. Dengan menggunakan folder static ini, Anda dapat merujuk ke file CSS misalnya, dalam template Flask Anda dengan path relatif seperti `<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">`.
