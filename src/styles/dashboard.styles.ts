import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#F8FAFC",
  padding: 18,
},

section: {
  fontSize: 20,
  fontWeight: "700",
  color: "#0F172A",
  marginBottom: 15,
  marginTop: 10,
},

currentCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 24,
  padding: 22,
  marginBottom: 20,
  elevation: 5,
  shadowColor: "#2563EB",
  shadowOpacity: 0.08,
  shadowRadius: 10,
},

iconCircle: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#EFF6FF",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 18,
},

subject: {
  fontSize: 24,
  fontWeight: "700",
  color: "#0F172A",
},

info: {
  marginTop: 10,
  fontSize: 15,
  color: "#64748B",
},

button: {
  marginTop: 22,
  backgroundColor: "#2563EB",
  paddingVertical: 15,
  borderRadius: 16,
  alignItems: "center",
},

buttonText: {
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: 16,
},

nextCard: {
  backgroundColor: "#DBEAFE",
  borderRadius: 22,
  padding: 20,
  marginBottom: 20,
},

nextTitle: {
  fontSize: 19,
  fontWeight: "700",
  color: "#1E3A8A",
},

nextTime: {
  marginTop: 8,
  color: "#1D4ED8",
  fontWeight: "600",
},

nextRoom: {
  marginTop: 5,
  color: "#475569",
},

scheduleCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 22,
  padding: 18,
  marginBottom: 20,
  elevation: 4,
  shadowColor: "#2563EB",
  shadowOpacity: 0.08,
  shadowRadius: 10,
},

scheduleItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderBottomColor: "#F1F5F9",
},

scheduleName: {
  fontSize: 16,
  fontWeight: "700",
  color: "#0F172A",
},

scheduleTime: {
  marginTop: 5,
  color: "#64748B",
},

room: {
  color: "#2563EB",
  fontWeight: "600",
},

summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 30,
},

summaryBox: {
  width: "31%",
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  paddingVertical: 20,
  alignItems: "center",
  elevation: 4,
  shadowColor: "#2563EB",
  shadowOpacity: 0.08,
  shadowRadius: 10,
},

summaryNumber: {
  fontSize: 26,
  fontWeight: "700",
  color: "#2563EB",
},

summaryLabel: {
  marginTop: 8,
  fontSize: 13,
  color: "#64748B",
  textAlign: "center",
},

controlCard:{
  backgroundColor:"#fff",
  borderRadius:22,
  padding:20,
  marginBottom:20,
  elevation:4,
  shadowColor:"#000",
  shadowOpacity:.08,
  shadowRadius:10,
},

controlSub:{
  color:"#64748B",
  marginBottom:8,
},

controlTitle:{
  fontSize:22,
  fontWeight:"700",
  color:"#0F172A",
},

controlTime:{
  marginTop:6,
  color:"#64748B",
},

divider:{
  height:1,
  backgroundColor:"#E2E8F0",
  marginVertical:18,
},

label:{
  fontWeight:"700",
  fontSize:16,
  color:"#334155",
  marginBottom:12,
},

teacherRow:{
  flexDirection:"row",
  alignItems:"center",
},

avatar:{
  width:52,
  height:52,
  borderRadius:26,
  backgroundColor:"#4F46E5",
  justifyContent:"center",
  alignItems:"center",
  marginRight:14,
},

avatarText:{
  color:"#fff",
  fontWeight:"700",
},

teacherName:{
  fontWeight:"600",
  fontSize:16,
  color:"#0F172A",
},

teacherStatus:{
  marginTop:4,
  color:"#22C55E",
},

buttonRow:{
  flexDirection:"row",
  justifyContent:"space-between",
},

actionButton:{
  width:"48%",
  borderRadius:16,
  paddingVertical:16,
  alignItems:"center",
},

greenButton:{
  backgroundColor:"#22C55E",
},

redButton:{
  backgroundColor:"#EF4444",
},

actionText:{
  color:"#fff",
  fontWeight:"700",
  fontSize:15,
},

actionSub:{
  color:"#fff",
  marginTop:4,
  fontSize:12,
},

policyCard:{
  marginTop:20,
  borderWidth:1,
  borderColor:"#E2E8F0",
  borderRadius:18,
  padding:18,
},

policyTitle:{
  fontSize:18,
  fontWeight:"700",
  color:"#0F172A",
},

policyDesc:{
  color:"#64748B",
  marginTop:6,
  marginBottom:15,
},

radioRow:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:14,
},

radioSelected:{
  width:22,
  height:22,
  borderRadius:11,
  borderWidth:6,
  borderColor:"#4F46E5",
  marginRight:12,
},

radio:{
  width:22,
  height:22,
  borderRadius:11,
  borderWidth:2,
  borderColor:"#94A3B8",
  marginRight:12,
},

radioText:{
  flex:1,
  fontSize:15,
},

saveButton:{
  backgroundColor:"#4F46E5",
  paddingVertical:15,
  borderRadius:14,
  alignItems:"center",
  marginTop:10,
},

saveText:{
  color:"#fff",
  fontWeight:"700",
},

reminderCard:{
  backgroundColor:"#fff",
  borderRadius:22,
  padding:20,
  marginBottom:20,
  elevation:4,
  shadowColor:"#000",
  shadowOpacity:.08,
  shadowRadius:10,
},

reminderSub:{
  color:"#64748B",
  marginBottom:18,
},

reminderItem:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  paddingVertical:15,
  borderBottomWidth:1,
  borderBottomColor:"#F1F5F9",
},

reminderTitle:{
  fontSize:16,
  fontWeight:"700",
  color:"#0F172A",
},

reminderInfo:{
  marginTop:5,
  color:"#64748B",
},

smallButton:{
  borderWidth:1,
  borderColor:"#4F46E5",
  borderRadius:12,
  paddingHorizontal:18,
  paddingVertical:8,
},

smallButtonText:{
  color:"#4F46E5",
  fontWeight:"700",
},

sendButton:{
  marginTop:20,
  backgroundColor:"#4F46E5",
  borderRadius:14,
  paddingVertical:15,
  alignItems:"center",
},

sendButtonText:{
  color:"#fff",
  fontWeight:"700",
},
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "flex-end",
},

modalContent: {
  backgroundColor: "#fff",
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  padding: 20,
  maxHeight: "70%",
},

modalTitle: {
  fontSize: 22,
  fontWeight: "700",
  marginBottom: 15,
},

modalItem: {
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

modalNama: {
  fontSize: 16,
  fontWeight: "700",
},

modalNim: {
  color: "#64748B",
  marginTop: 3,
},

closeButton: {
  marginTop: 20,
  backgroundColor: "#4F46E5",
  borderRadius: 12,
  padding: 15,
  alignItems: "center",
},
previewMateri: {
  marginTop: 12,
  fontSize: 15,
  fontWeight: "600",
  color: "#2563EB",
},
});