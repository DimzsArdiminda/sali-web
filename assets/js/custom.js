$(document).ready(function () {
    // Event ketika tombol "Add User" ditekan
    $('.btn-info').on('click', function () {
        // Tampilkan modal Add User
        $('#addUserModal').modal('show');
    });

    // Event ketika tombol "Add User" di modal ditekan
    $('#saveNewUser').on('click', function () {
        // Ambil data dari form
        let nama = $('#addNama').val();
        let email = $('#addEmail').val();
        let noHp = $('#addNoHp').val();
        let status = $('#addStatus').val();

        // Cek jika form sudah diisi
        if (nama && email && noHp) {
            // Tambahkan data ke tabel
            let newRow = `
            <tr>
              <td>#</td>
              <td>${nama}</td>
              <td>${email}</td>
              <td>${noHp}</td>
              <td>
                <label class="switch">
                  <input type="checkbox" ${status === 'active' ? 'checked' : ''}>
                  <span class="slider"></span>
                </label>
              </td>
              <td>
                <button class="btn btn-danger btn-sm"><i class="ti ti-trash"></i></button>
                <button class="btn btn-primary btn-sm"><i class="ti ti-edit"></i></button>
              </td>
            </tr>
          `;

            // Tambahkan baris ke tabel
            $('#myTable tbody').append(newRow);

            // Reset form
            $('#addUserForm')[0].reset();

            // Tutup modal
            $('#addUserModal').modal('hide');
        } else {
            alert('Please fill out all fields!');
        }
    });

    // Event ketika tombol "Edit" ditekan
    $('.btn-primary').on('click', function () {
        let row = $(this).closest('tr');
        let nama = row.find('td:eq(1)').text();
        let email = row.find('td:eq(2)').text();
        let noHp = row.find('td:eq(3)').text();
        let status = row.find('td:eq(4) input').is(':checked') ? 'active' : 'inactive';

        // Masukkan data ke modal
        $('#editNama').val(nama);
        $('#editEmail').val(email);
        $('#editNoHp').val(noHp);
        $('#editStatus').val(status);

        // Tampilkan modal
        $('#editModal').modal('show');
    });

    // Simpan perubahan pada modal
    $('#saveChanges').on('click', function () {
        let nama = $('#editNama').val();
        let email = $('#editEmail').val();
        let noHp = $('#editNoHp').val();
        let status = $('#editStatus').val();

        // Update data di tabel (ini hanya contoh, biasanya data disimpan ke database)
        let row = $('.btn-primary').closest('tr');
        row.find('td:eq(1)').text(nama);
        row.find('td:eq(2)').text(email);
        row.find('td:eq(3)').text(noHp);
        row.find('td:eq(4) input').prop('checked', status === 'active');

        // Tutup modal
        $('#editModal').modal('hide');
    });

    // Event ketika tombol "Delete" ditekan
    $('.btn-danger').on('click', function () {
        let row = $(this).closest('tr');
        let nama = row.find('td:eq(1)').text();

        // Tampilkan SweetAlert konfirmasi
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${nama}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Hapus baris dari tabel
                row.remove();

                Swal.fire(
                    'Deleted!',
                    `${nama} has been deleted.`,
                    'success'
                )
            }
        })
    });
});