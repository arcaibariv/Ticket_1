create table usuarios(
id_usuario int not null auto_increment,
usuario varchar(20) not null,
contrasena varchar(50) not null,
correo varchar(50) not null,
primary key (id_usuario)
);

create table id_pptos(
id_presupuesto int not null auto_increment,
num_presupuesto varchar(10) not null,
primary key (id_presupuesto)
);

create table presupuestos(
id_presupuesto int not null,
id_usuario int not null,
nombre_presupuesto varchar(50) not null,
numero_version int not null,
ingresos float not null,
egresos float not null,
actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table presupuesto_exts(
id_presupuesto int not null,
tipo_mov varchar(10),
concepto varchar(255),
cantidad float
)