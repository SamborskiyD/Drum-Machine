
const Wrapper = ({children, id}) => {
    return (
        <div id={id}> 
            {children}
        </div>
    );
};

export default Wrapper;