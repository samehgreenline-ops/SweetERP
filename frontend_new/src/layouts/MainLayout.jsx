import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";

import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Inventory,
  Factory,
  ShoppingCart,
  Receipt,
  AccountBalance,
  Assessment,
  Settings,
} from "@mui/icons-material";

import { useAuth } from "../context/AuthContext.jsx";


const menuGroups = [
  {
    text:"لوحة التحكم",
    icon:<Dashboard />,
    path:"/",
    permission:"dashboard.view",
  },

  {
    text:"المخزون",
    icon:<Inventory />,
    permission:"inventory.stock.view",
    children:[
      {text:"الأصناف",path:"/items",permission:"items.item.view"},
      {text:"حركة المخزون",path:"/inventory",permission:"inventory.stock.view"},
    ],
  },

  {
    text:"الإنتاج",
    icon:<Factory />,
    permission:"production.order.view",
    children:[
      {text:"الوصفات",path:"/recipes",permission:"production.order.view"},
      {text:"أوامر الإنتاج",path:"/production",permission:"production.order.view"},
    ],
  },

  {
    text:"المبيعات",
    icon:<ShoppingCart />,
    permission:"sales.invoice.view",
    children:[
      {text:"فواتير البيع",path:"/sales",permission:"sales.invoice.view"},
      {text:"العملاء",path:"/customers",permission:"customers.customer.view"},
    ],
  },

  {
    text:"المشتريات",
    icon:<Receipt />,
    permission:"purchases.invoice.view",
    children:[
      {text:"فواتير الشراء",path:"/purchases",permission:"purchases.invoice.view"},
      {text:"الموردون",path:"/suppliers",permission:"suppliers.supplier.view"},
    ],
  },

  {
    text:"التقارير",
    icon:<Assessment />,
    permission:"reports.report.view",
    children:[
      {text:"التقارير المالية",path:"/reports",permission:"reports.report.view"},
    ],
  },

  {
    text:"الإدارة",
    icon:<Settings />,
    permission:"users.manage",
    children:[
      {text:"المستخدمون",path:"/users",permission:"users.manage"},
      {text:"الأدوار والصلاحيات",path:"/roles",permission:"roles.manage"},
      {text:"إعدادات الشركة",path:"/company-settings",permission:"users.manage"},
    ],
  },
];


function MainLayout(){

  const location = useLocation();

  const {hasPermission,user}=useAuth();

  const [openGroups,setOpenGroups]=useState({});
  const [coreMenus,setCoreMenus]=useState([]);


  useEffect(()=>{

    fetch("http://localhost:3001/api/core/modules")
      .then(res=>res.json())
      .then(data=>{
        setCoreMenus(data.menus || []);
      })
      .catch(err=>{
        console.log("Core menu error",err);
      });

  },[]);



  function toggleGroup(id){

    setOpenGroups(prev=>({
      ...prev,
      [id]:!prev[id]
    }));

  }



  function renderLink(item){

    if(!hasPermission(item.permission))
      return null;


    return(
      <ListItem key={item.path} disablePadding>

        <ListItemButton
          component={NavLink}
          to={item.path}
          selected={location.pathname===item.path}
          sx={{pr:5,textAlign:"right"}}
        >

          <ListItemText primary={item.text}/>

        </ListItemButton>

      </ListItem>
    );

  }



  function renderCoreMenu(menu){

    return(

      <Box key={menu.id}>

        <ListItemButton
          onClick={()=>toggleGroup(menu.id)}
        >

          <AccountBalance/>

          <ListItemText
            primary={menu.title}
            sx={{mr:1}}
          />

          {
            openGroups[menu.id]
            ?
            <ExpandLess/>
            :
            <ExpandMore/>
          }

        </ListItemButton>


        <Collapse
          in={openGroups[menu.id]}
          timeout="auto"
          unmountOnExit
        >

          <List>

          {
            menu.children?.map(item=>

              hasPermission(item.permission) &&

              <ListItem key={item.id} disablePadding>

                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{pr:5}}
                >

                  <ListItemText primary={item.title}/>

                </ListItemButton>

              </ListItem>

            )
          }

          </List>

        </Collapse>

      </Box>

    );

  }



  return(

    <Box
      sx={{
        minHeight:"100vh",
        direction:"rtl",
        display:"flex",
        backgroundColor:"#f5f5f5"
      }}
    >

      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width:240,
          flexShrink:0,
          "& .MuiDrawer-paper":{
            width:240,
            boxSizing:"border-box"
          }
        }}
      >

        <Box sx={{width:240,p:2}}>

          <Typography
            variant="h5"
            sx={{
              fontWeight:"bold",
              textAlign:"center",
              mb:1
            }}
          >
            SweetERP
          </Typography>


          {
            user &&
            <Typography sx={{textAlign:"center",mb:2}}>
              {user.full_name}
            </Typography>
          }


          <List>

            {
              coreMenus.map(renderCoreMenu)
            }


            {
              menuGroups.map(group=>{

                if(group.children){

                  const children =
                    group.children.filter(
                      x=>hasPermission(x.permission)
                    );


                  if(children.length===0)
                    return null;


                  return(

                    <Box key={group.text}>

                      <ListItemButton
                        onClick={()=>toggleGroup(group.text)}
                      >

                        {group.icon}

                        <ListItemText
                          primary={group.text}
                          sx={{mr:1}}
                        />

                        {
                          openGroups[group.text]
                          ?
                          <ExpandLess/>
                          :
                          <ExpandMore/>
                        }

                      </ListItemButton>


                      <Collapse
                        in={openGroups[group.text]}
                        timeout="auto"
                        unmountOnExit
                      >

                        <List>
                          {
                            children.map(renderLink)
                          }
                        </List>

                      </Collapse>


                    </Box>

                  );

                }


                return renderLink(group);

              })
            }

          </List>


        </Box>

      </Drawer>



      <Box
        component="main"
        sx={{
          flexGrow:1,
          width:"calc(100% - 240px)",
          minWidth:0,
          overflowX:"hidden",
          p:3
        }}
      >

        <Outlet/>

      </Box>


    </Box>

  );

}


export default MainLayout;