import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Button,
  Box,
} from "@mui/material";


function Roles() {

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);



  useEffect(() => {

    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      });

  }, []);



  function loadRolePermissions(role) {

    setSelectedRole(role);

    fetch(`/api/roles/${role.id}/permissions`)
      .then((res) => res.json())
      .then((data) => {

        setPermissions(data);

        setSelectedPermissions(
          data.map((item) => item.id)
        );

      });

  }



  function togglePermission(id) {

    setSelectedPermissions((current) => {

      if (current.includes(id)) {

        return current.filter(
          (item) => item !== id
        );

      }


      return [
        ...current,
        id
      ];

    });

  }



  function savePermissions() {

    if (!selectedRole) return;


    fetch(`/api/roles/${selectedRole.id}/permissions`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        permissions: selectedPermissions,
      }),

    })
    .then((res) => res.json())
    .then(() => {

      alert("Permissions saved");

    });

  }



  return (

    <Paper sx={{ p: 3 }}>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Roles & Permissions
      </Typography>


      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >


        <Paper
          sx={{
            width: 300,
            p: 2,
          }}
        >

          <Typography variant="h6">
            Roles
          </Typography>


          <List>

            {roles.map((role) => (

              <ListItem
                key={role.id}
                disablePadding
              >

                <ListItemButton
                  selected={
                    selectedRole?.id === role.id
                  }
                  onClick={() =>
                    loadRolePermissions(role)
                  }
                >

                  <ListItemText
                    primary={role.name}
                    secondary={role.company_name}
                  />

                </ListItemButton>

              </ListItem>

            ))}

          </List>


        </Paper>




        <Paper
          sx={{
            flex: 1,
            p: 2,
          }}
        >

          <Typography variant="h6">
            Permissions
          </Typography>


          {!selectedRole && (

            <Typography sx={{ mt: 2 }}>
              Select a role
            </Typography>

          )}



          {selectedRole && permissions.map((permission) => (

            <Box
              key={permission.id}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >

              <Checkbox

                checked={
                  selectedPermissions.includes(
                    permission.id
                  )
                }

                onChange={() =>
                  togglePermission(permission.id)
                }

              />

              <Typography>
                {permission.name}
              </Typography>

            </Box>

          ))}



          {selectedRole && (

            <Button
              variant="contained"
              sx={{
                mt: 3,
              }}
              onClick={savePermissions}
            >
              Save Permissions
            </Button>

          )}


        </Paper>


      </Box>


    </Paper>

  );

}


export default Roles;