import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { Icon } from "@mui/material";

export const ValidatePasswordForm = ({
  validated,
}: {
  validated: {
    upperValidated: boolean;
    numberValidated: boolean;
    specialValidated: boolean;
    lengthValidated: boolean;
  };
}) => {
  return (
    <div className="text-black">
      <div>The password must be:</div>
      <div className={`${validated.lengthValidated && "text-green-500"}`}>
        {validated.lengthValidated ? (
          <Icon component={CheckCircleOutline} fontSize="inherit" />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <span className="ml-1">Between 8 and 20 characters long</span>
      </div>
      <div className={`${validated.upperValidated && "text-green-500"}`}>
        {validated.upperValidated ? (
          <Icon component={CheckCircleOutline} fontSize="inherit" />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <span className="ml-1">Contains at least 1 upper case character</span>
      </div>
      <div className={`${validated.numberValidated && "text-green-500"}`}>
        {validated.numberValidated ? (
          <Icon component={CheckCircleOutline} fontSize="inherit" />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <span className="ml-1">Contains at least 1 numberic character</span>
      </div>
      <div className={`${validated.specialValidated && "text-green-500"}`}>
        {validated.specialValidated ? (
          <Icon component={CheckCircleOutline} fontSize="inherit" />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <span className="ml-1">Contains at least 1 special character</span>
      </div>
    </div>
  );
};
