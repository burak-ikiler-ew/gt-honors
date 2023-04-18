<?php

/**
 * @file
 * It is recommended that you leave this file alone.
 */

$host = "db";
$port = 3306;
$driver = "mysql";


$databases['default']['default'] = array(
  'database' => "db",
  'username' => "db",
  'password' => "db",
  'host' => $host,
  'driver' => $driver,
  'port' => $port,
  'prefix' => "",
);

$settings['hash_salt'] = 'kaBusiPFKNQceZeyzHPAaXKaWLdnBlaBRuPLoOsdggcpUTiBaZQlCJGTamVfYckB';

// This will prevent Drupal from setting read-only permissions on sites/default.
$settings['skip_permissions_hardening'] = TRUE;

// This will ensure the site can only be accessed through the intended host
// names. Additional host patterns can be added for custom configurations.
$settings['trusted_host_patterns'] = ['.*'];
