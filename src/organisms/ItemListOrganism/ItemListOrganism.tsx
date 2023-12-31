// ItemListOrganism.tsx

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ListItemMolecules from '../../molecules/ListItemMolecules/ListItemMolecules';

type ItemListProps = {
  data: any;
  handleItemClick: (item: any) => void;
  handleOptionClick: (item: any) => void;
  activeTab?: string;
};

const ItemListOrganism: React.FC<ItemListProps> = ({ data, handleItemClick, handleOptionClick, activeTab }) => {
  // console.log("DATA:",data);

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <ListItemMolecules item={item} 
          activeTab={activeTab}
          onOptionClick={(item) => {
            handleItemClick(item);
          }} 
          handleOptionClick={handleOptionClick}/>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    padding: 20,
  },
});


export default ItemListOrganism;
