import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import ListItemMolecules from "../../molecules/ListItemMolecules/ListItemMolecules";

type ItemListProps = {
  data: any;
  handleItemClick: (item: any) => void;
  handleOptionClick: (item: any) => void;
  activeTab?: string;
};

const ItemListOrganism: React.FC<ItemListProps> = ({
  data,
  handleItemClick,
  handleOptionClick,
  activeTab,
}) => {
  return (
    <View style={[styles.outerContainer]}>
      <FlatList
        style={[styles.heightList]}
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <ListItemMolecules
            item={item}
            activeTab={activeTab}
            onOptionClick={(item) => {
              handleItemClick(item);
            }}
            handleOptionClick={handleOptionClick}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingBottom: 80, // Ajuste para a altura da barra de abas
  },
  heightList: {
    height: "auto",
  },
});

export default ItemListOrganism;
