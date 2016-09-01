<?php

define('DB_NAME', 'merzablog');
define('DB_USER', 'wplmerza');
define('DB_PASSWORD', 'pea7ce321');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

define('AUTH_KEY',         'x6s #7Nf/)I76,b=ea7{?d*FHV-9qkPc:^&kB)nVSj[(a-t7=P6<Q$+.`YSG|.F,');
define('SECURE_AUTH_KEY',  'lD2E!V1%o3d|pvzBto;(.a3v}WjSDb)fGf@kOoQgYZezJ$)UxxP.uoeM`Z#)HJ,{');
define('LOGGED_IN_KEY',    'RoVZQ`5|myQe0,Q{|W_L<{s+zO)f8A<G+xm+T9sb@dJ0Q?^D!-<*`r$>an16/|W=');
define('NONCE_KEY',        'tLgMEBjXho[*G8Z&L5+ga3n#~8-.@~HK3VdoU KOhi$ZMDe==39sQ+3U+W%*+0M%');
define('AUTH_SALT',        'mLw0pAT S9/bWrp=4nD|=btbw}<CS#$QVkVW;4;XBYh0II!;pzC;iQXcrb*gg-mS');
define('SECURE_AUTH_SALT', '$:6.`r0eBmS<H>u|2i:!#c[y*PhaN+l9nXL6Mq`@Px!.t}(U1M)JPP+u1l=8,Tf}');
define('LOGGED_IN_SALT',   ']IJLQ-!Q.SpWAwcV9c TU-S^Hu;L9z!}Cn+,gPXJ/)2eyDR[6J$CqsnuoT=M5o-L');
define('NONCE_SALT',       'Ep;.g?4>jAT?s`]W+&k&z6([FJ*%X16zQPykp+3ns+4n;631.0x^<9jC~ZVX(.-4');

$table_prefix  = 'wp_';

define('WP_DEBUG', false);
define('FS_METHOD', 'direct');
define( 'AUTOSAVE_INTERVAL', 30);
define( 'WP_POST_REVISIONS', 5 );


if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

require_once(ABSPATH . 'wp-settings.php');



