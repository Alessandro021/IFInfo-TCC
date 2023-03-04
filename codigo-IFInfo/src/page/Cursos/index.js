import React,{ useState} from 'react';
import { useWindowDimensions } from 'react-native';
import  {  TabView ,  SceneMap, TabBar }  from  'react-native-tab-view' ;
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../services/Themes'
import Tecnico from '../Tecnico';
import Superior from '../Superior';

// yarn add react-native-tab-view
// expo install react-native-pager-view



const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#008001'}}
    labelStyle={{ fontSize: RFValue(11),
      fontFamily: THEME.FONTS.r500,}}
  />
);


export default function Cursos() {

  const layout = useWindowDimensions();
  // const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'tecnico', title: 'Técnico' },
    { key: 'superior', title: 'Superior' },
  ]);
  
  
 return (
   <TabView
     navigationState={{ index, routes }}
     renderTabBar={renderTabBar}
    
     style = { {  backgroundColor : '#FFF', flex: 1 } } 
     renderScene={SceneMap({
      tecnico: Tecnico,
      superior: Superior,
    })}
     onIndexChange={setIndex}
     initialLayout={{ width: layout.width }}
   />
   
  );
}
