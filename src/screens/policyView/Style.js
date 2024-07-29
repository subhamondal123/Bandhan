import { StyleSheet } from "react-native";
import { Color } from "../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  filterBtn: {
    alignItems: "flex-start",
    height: 25,
    marginRight: 10,
  },

  headerActionArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
  },
  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  filterImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  listHeaderMain: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
  },
  listHeaderSubMain: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default styles;
