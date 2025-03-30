import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { LoanData, getLoanData } from '../utils/mockData';

const Container = styled(Box)({
  padding: '20px',
  width: '100%',
});

const Header = styled(Box)({
  marginBottom: '20px',
});

const SearchContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginBottom: '20px',
  alignItems: 'center',
});

const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
});

const tabItems = ['All', 'Pre Sarfaesi', 'NPA', '13(2) Responses', 'Symbolic Possession', 'DM Order', 'Physical Possessions', 'Auctions'];

const Portfolio: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loans, setLoans] = useState<LoanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoanData();
        setLoans(data);
      } catch (error) {
        console.error('Error fetching loan data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedLoans(loans.map(loan => loan.id));
    } else {
      setSelectedLoans([]);
    }
  };

  const handleSelectLoan = (id: string) => {
    setSelectedLoans(prev =>
      prev.includes(id)
        ? prev.filter(loanId => loanId !== id)
        : [...prev, id]
    );
  };

  const filteredLoans = loans.filter(loan =>
    loan.loanNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <h1>Portfolio</h1>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="portfolio tabs"
        >
          {tabItems.map((label, index) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Header>

      <SearchContainer>
        <TextField
          placeholder="Search Loan Number"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          sx={{ marginLeft: 'auto' }}
        >
          More Filters
        </Button>
      </SearchContainer>

      <StyledTableContainer component={Paper}>
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedLoans.length > 0 && selectedLoans.length < loans.length}
                    checked={selectedLoans.length === loans.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Loan No.</TableCell>
                <TableCell>Loan Type</TableCell>
                <TableCell>Borrower</TableCell>
                <TableCell>Borrower Address</TableCell>
                <TableCell>Co-Borrower 1 Name</TableCell>
                <TableCell>Co-Borrower 1 Address</TableCell>
                <TableCell>Current DPD</TableCell>
                <TableCell>Sanction Amount</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow
                  key={loan.id}
                  hover
                  selected={selectedLoans.includes(loan.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedLoans.includes(loan.id)}
                      onChange={() => handleSelectLoan(loan.id)}
                    />
                  </TableCell>
                  <TableCell>{loan.loanNo}</TableCell>
                  <TableCell>{loan.loanType}</TableCell>
                  <TableCell>{loan.borrower}</TableCell>
                  <TableCell>{loan.borrowerAddress}</TableCell>
                  <TableCell>{loan.coBorrowerName}</TableCell>
                  <TableCell>{loan.coBorrowerAddress}</TableCell>
                  <TableCell>{loan.currentDPD}</TableCell>
                  <TableCell>₹ {loan.sanctionAmount.toLocaleString()}</TableCell>
                  <TableCell>{loan.region}</TableCell>
                  <TableCell>{loan.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>
    </Container>
  );
};

export default Portfolio; 