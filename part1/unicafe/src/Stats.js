const StatisticLine = ({ name, value }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StatisticLine;
