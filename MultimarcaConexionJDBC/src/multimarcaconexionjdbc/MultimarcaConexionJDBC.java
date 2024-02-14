
package multimarcaconexionjdbc;

/**
 *
 * @author david
 */

import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MultimarcaConexionJDBC {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String usuario = "root";
        String password = "";
        String url = "jdbc:mysql://localhost:3306/registrousuario_db";
        Connection  conexion;
        Statement statement;
        ResultSet rs;
        
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(MultimarcaConexionJDBC.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        try {
            conexion = DriverManager.getConnection(url,usuario,password);
            statement = conexion.createStatement();
            statement.executeUpdate("INSERT INTO USUARIOS (NOMBRE_COMPLETO,CORREO, USUARIO, CONTRASENA) VALUES ('ABC','ABC123','ABC','ABC123')");
            rs = statement.executeQuery("SELECT * FROM USUARIOS");
            rs.next();
            do{
                System.out.println(rs.getString("nombre_completo")+" : "+rs.getString("correo"));
               
            }while(rs.next());
            
            
        } catch (SQLException ex) {
            Logger.getLogger(MultimarcaConexionJDBC.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
        
}