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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";


function Users() {

  const [users, setUsers] = useState([]);

  const [companies, setCompanies] = useState([]);

  const [roles, setRoles] = useState([]);

  const [open, setOpen] = useState(false);


  const [form, setForm] = useState({
    company_id: "",
    role_id: "",
    username: "",
    password_hash: "",
    full_name: "",
    email: "",
  });


  function loadUsers() {

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });

  }


  useEffect(() => {

    loadUsers();


    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });


    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      });


  }, []);



  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }



  function saveUser() {

    fetch("/api/users", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),

    })

      .then((res) => res.json())

      .then(() => {

        setOpen(false);

        setForm({
          company_id: "",
          role_id: "",
          username: "",
          password_hash: "",
          full_name: "",
          email: "",
        });

        loadUsers();

      });

  }



  return (

    <Paper sx={{ p: 3 }}>


      <Typography variant="h5" sx={{ mb: 2 }}>
        Users
      </Typography>


      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>



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

                <TableCell>{user.id}</TableCell>

                <TableCell>{user.username}</TableCell>

                <TableCell>{user.full_name}</TableCell>

                <TableCell>{user.company_name}</TableCell>

                <TableCell>{user.role_name}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  {user.active ? "Active" : "Inactive"}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>



      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >

        <DialogTitle>
          Add New User
        </DialogTitle>


        <DialogContent>


          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
          />


          <TextField
            label="Full Name"
            name="full_name"
            fullWidth
            margin="normal"
            value={form.full_name}
            onChange={handleChange}
          />


          <TextField
            label="Password"
            name="password_hash"
            type="password"
            fullWidth
            margin="normal"
            value={form.password_hash}
            onChange={handleChange}
          />


          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />



          <TextField
            select
            label="Company"
            name="company_id"
            fullWidth
            margin="normal"
            value={form.company_id}
            onChange={handleChange}
          >

            {companies.map((company) => (

              <MenuItem
                key={company.id}
                value={company.id}
              >
                {company.name}
              </MenuItem>

            ))}

          </TextField>



          <TextField
            select
            label="Role"
            name="role_id"
            fullWidth
            margin="normal"
            value={form.role_id}
            onChange={handleChange}
          >

            {roles.map((role) => (

              <MenuItem
                key={role.id}
                value={role.id}
              >
                {role.name}
              </MenuItem>

            ))}

          </TextField>


        </DialogContent>



        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveUser}
          >
            Save
          </Button>

        </DialogActions>


      </Dialog>


    </Paper>

  );

}


export default Users;