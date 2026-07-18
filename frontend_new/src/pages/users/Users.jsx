import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Users loading error:", error);
      });
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Users
      </Typography>

      <TableContainer>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>

                <TableCell>
                  {user.id}
                </TableCell>

                <TableCell>
                  {user.username}
                </TableCell>

                <TableCell>
                  {user.full_name}
                </TableCell>

                <TableCell>
                  {user.company_name}
                </TableCell>

                <TableCell>
                  {user.role_name}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  {user.active ? "Active" : "Inactive"}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Users;