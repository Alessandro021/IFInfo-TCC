import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerHeader from '../component/DrawerHeader';

import Inicio from '../routes/Inicio';
import RotaCursosOfertados from '../routes/RotaCursosOfertados';
import RotaCalendario from '../routes/RotaCalendario';
import RotaDeServidores from '../routes/RotaDeServidores';
import RotaContatos from '../routes/RotaContatos';

import RotaAutenticacao from '../routes/RotaAutenticacao.js'
import RotaAreaDoAluno from '../routes/RotaAreaDoAluno.js'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../services/Themes.js'


const Drawer = createDrawerNavigator();

export default function RoutesDrawer(){

    return(
        <Drawer.Navigator
        drawerContent={(props) => <DrawerHeader {...props}/>}
        screenOptions={{
            
            drawerStyle: {
                backgroundColor: "#D9D9D9",
                width: '60%', //tamanho da tela do drawer          
            },

            drawerLabelStyle: {
                fontWeight: 'bold',
                fontSize: RFValue(12),
                fontFamily: THEME.FONTS.r700,
                // fontWeight: '700',
            },

            // drawerHideStatusBarOnOpen: true,
            drawerActiveTintColor: '#FFF',
            drawerActiveBackgroundColor: '#008001',
            drawerInactiveBackgroundColor: '#FFF',
            drawerInactiveTintColor: '#000',
            drawerItemStyle: {
                justifyContent:  "center",
                marginVertical: 8,
                height: 50,
                shadowColor: 'rgba(0,0,0,1)',
                shadowOffset:{
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.5,
                shadowOpacity: 0.26,
                shadowRadius: 8,
                borderRadius: 10,
                elevation: 5,
            },
        }}     
        >    
            <Drawer.Screen 
            name="Inicio"
            component={Inicio}
            options={{
                drawerIcon: ({ color }) => <MaterialCommunityIcons name= "home" size={24} color= {color} />,
                headerShown: false,
            }}
            />

            <Drawer.Screen 
            name="Calendário"
            component={RotaCalendario}
            options={{
                drawerIcon: ({ color }) => <MaterialCommunityIcons name= "calendar-blank-multiple" size={24} color= {color} />,
                headerShown: false,
            }
            }
            />

            <Drawer.Screen 
            name="Cursos Ofertados"
            component={RotaCursosOfertados}
            options={{
                drawerIcon: ({ color }) => <MaterialCommunityIcons name= "book-education" size={24} color= {color} />,
                headerShown: false,
            }}
            />

            <Drawer.Screen 
            name="Contatos"
            component={RotaContatos}
            options={{
                drawerIcon: ({ color }) => <MaterialCommunityIcons name="contacts" size={24} color= {color} />,
                headerShown: false,
            }
            }
            />

            <Drawer.Screen 
            name="Drawer Servidores"
            component={RotaDeServidores}
            options={{
                title: "Servidores",
                drawerIcon: ({ color }) => <Ionicons name="md-people" size={24} color= {color} />,
                headerShown: false,
            }
            }
            />

            <Drawer.Screen 
            name="Login"
            component={RotaAutenticacao}
            options={{
                headerShown: false,
                drawerItemStyle: { display: "none" }, //oculta o drawer
                title: 'Logar como Aluno',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },
            }
            }
            />

            <Drawer.Screen 
            name="Area do Aluno drawer"
            component={RotaAreaDoAluno}
            options={{
                headerShown: false,
                drawerItemStyle: { display: "none" }, //oculta o drawer
                title: 'Logar como Aluno',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#008001',
                    shadowColor: 0
                },
            }
            }
            />

        </Drawer.Navigator>
    )

}