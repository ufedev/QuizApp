<form method="POST" class="flex flex-col mx-auto gap-5 min-w-[20rem]">

    <div class="flex flex-col gap-1">
        <label>Nombre</label>
        <input class="p-1 text-black" type='text' placeholder='Nombre' name='name' value="<?php echo $name; ?>" />
    </div>
    <div class="flex flex-col gap-1">
        <label>Apellido</label>
        <input class="p-1 text-black" type='text' placeholder='Apellido' name='lastname' value="<?php echo $lastname; ?>" />
    </div>
    <div class='flex flex-col gap-1'>
        <label>Usuario</label>
        <input class="p-1 text-black" type='text' placeholder='usuario' name='username' value="<?php echo $username; ?>" />
    </div>
    <div class="flex flex-col gap-1">
        <label>Contraseña</label>
        <input class="p-1 text-black" type='password' placeholder='contraseña' name='password' />
    </div>
    <input class="bg-slate-800 p-2 border-[1px] cursor-pointer border-white" type="submit" value="Crear usuario">
    <p><?php echo $msg; ?></p>
</form>