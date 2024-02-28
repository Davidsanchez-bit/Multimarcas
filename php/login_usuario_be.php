<?php
    session_start();
    include 'conexion_be.php';

    $correo = $_POST ['correo'];
    $contrasena = $_POST ['contrasena'];
    $contrasena = hash ('sha512', $contrasena);

    $validar_login = mysqli_query($conexion, " SELECT * FROM usuarios WHERE correo = '$correo' and contrasena ='$contrasena'");

    if (mysqli_num_rows($validar_login) > 0){
        $_SESSION['usuario'] = $correo;
        
        header("location: ../index.html");
        exit;
    }else{
        echo '
            <script>
                alert("Correo o Contraseña son incorrrectos, Por favor verifique los datos introducidos");
                window.location = "../inicioSesion.html";
            </script>
        ';
        exit;
    }    
        


