<?php

include_once __DIR__ . "/../../config/const.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parcial</title>
    <link rel="stylesheet" href="<?php echo "http://" . URL . "/styles" ?>" />
    <script src="https://cdn.tailwindcss.com" defer></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <script type='module' src="<?php echo "http://" . URL . "/scripts" ?>" defer>
    </script>
</head>

<body class="flex flex-col w-full min-h-screen gap-5 bg-gradient-to-bl from-neutral-800 to-neutral-900 text-white">
    <div id='root'></div>
</body>

</html>