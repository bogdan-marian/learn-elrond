const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <div>layout - navbar</div>
        <div>{children}</div>
        <div>layout - footer</div>
      </div>
    </div>
  );
};

export default Layout;
