let url =""

if (process.env.NODE_ENV !== "production") {
    url = "http://localhost:3001"
}
export default url;
