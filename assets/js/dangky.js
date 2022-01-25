app.controller("dangkyCtrl", function ($scope) {
    $scope.dangky = function () {
        var email = $scope.email;
        var fullname = $scope.fullname;
        var password = $scope.password;
        var repassword = $scope.repassword;
        console.log(email);
        console.log(fullname);
        console.log(password);
        console.log(repassword);

        if (email == null || fullname == null || password == null || repassword == null) {
            Swal.fire({
				text: "Vui lòng không để trống thông tin đăng nhập!",
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			  });
            return;
        } else if (password != repassword) {
            Swal.fire({
				text: "Mật khẩu không trùng nhau!",
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			  });
            return;
        }

        db.collection('users').where("email", "==", email).get().then((snapshot) => {
            console.log(snapshot.docs.length);
            if (snapshot.docs.length > 0) {
                Swal.fire({
                    text: "Email đã tồn tại!",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                  });
                return;
            } else {
                Swal.fire({
                    text: "Đăng ký thành công!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                }).then(function() {
                    db.collection('users').add({
                        fullname: fullname,
                        password: password,
                        email: email,
                    }).then(function () {
                        window.location.href = '#!login';
                    });
                })
                
            }
        });
    }
});
