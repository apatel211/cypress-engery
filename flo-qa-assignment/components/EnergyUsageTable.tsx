import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import { EnergyUsage, EnergyUsageFormData } from '../app/types';
import { generateRandomId } from './helpers/randomId';

type Props = {
  data?: EnergyUsage;
  caption?: string;
};

type EnergyUsageTableHeader = {
  label: string;
  key: keyof EnergyUsageFormData;
};

const EnergyUsageTable = (props: Props) => {
  const { data, caption } = props;

  const records = data?.records ?? [];
  const headers: EnergyUsageTableHeader[] = [
    {
      label: 'NMI',
      key: 'nmi',
    },
    {
      label: 'Consumption',
      key: 'consumption',
    },
    {
      label: 'Timestamp',
      key: 'timestamp',
    },
  ];

  return (
    <>
      <TableContainer
        w='960px'
        maxH='70vh'
        border={'1px solid'}
        borderColor='lightgray'
        borderRadius={8}
        overflowY='auto'
      >
        <Table variant='striped'>
          <Thead position='sticky' top={0} zIndex='docked' background='white'>
            <Tr>
              {headers.map((header) => (
                <Th key={header.label}>{header.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {records.length > 0 ? (
              records
                .map((record) => {
                  return {
                    ...record,
                    timestamp: record.timestamp
                      ? new Date(record.timestamp).toLocaleString()
                      : new Date().toLocaleString(),
                  };
                })
                .map((record) => {
                  return (
                    <Tr key={record.id || generateRandomId()}>
                      {headers.map((header) => (
                        <Td key={`${record.nmi}-${header.key}`}>
                          {`${record[header.key]}${
                            header.key === 'consumption' ? ' kWh' : ''
                          }`}
                        </Td>
                      ))}
                    </Tr>
                  );
                })
            ) : (
              <Tr>No data available</Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontWeight={700}>{caption}</Text>
    </>
  );
};

export default EnergyUsageTable;
