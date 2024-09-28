export const DBProivers = {
  postgresql: "postgresql://$dbuser:$dbpassword@$dbhost:5432/$db?schema=$dbschema",
  mysql: "mysql://$dbuser:$dbpassword@$dbhost:3306/$dbname?schema=$dbschema",
  mongodb: "mongodb://$dbuser:$dbpassword@dbhost:27017/$dbname",
};
