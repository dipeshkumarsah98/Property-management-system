import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Group,
  TextInput,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import { useUserDetail } from "src/context/UserDetailContext.jsx";
import usePropertyType from "src/hooks/useType.jsx";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const { isLoading: loading, isError, data, error } = usePropertyType();
  const form = useForm({
    initialValues: {
      size: propertyDetails.size,
      status: propertyDetails.status,
      amentities: propertyDetails.amentities,
    },
    validate: {
      amentities: (value) => (value === "" ? "Must select a amentities" : null),
      size: (value) => (value === "" ? "Must select a size" : null),
      status: (value) => (value === "" ? "Must select a status" : null),
    },
  });

  const { size, status, amentities } = form.values;

  const handleSubmit = () => {
    const { hasErrors, errors } = form.validate();
    console.log(
      "🚀 ~ file: Facilities.jsx:45 ~ handleSubmit ~ errors:",
      errors
    );
    console.log(
      "🚀 ~ file: Facilities.jsx:45 ~ handleSubmit ~ hasErrors:",
      hasErrors
    );
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        typeId: 2,
        userId: 1,
        amentities,
        size,
        status,
      }));
      mutate();
    }
  };

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useUserDetail();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          typeId: 2,
          userId: 1,
          size,
          status,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        size: "",
        status: "",
        typeId: 2,
        userId: 1,
        images: null,
      });
      setOpened(false);
      setActiveStep(0);
    },
  });
  if (loading) return null;
  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {" "}
        <TextInput
          w={"100%"}
          withAsterisk
          label="size"
          {...form.getInputProps("size", { type: "input" })}
        />
        {/* <TextInput w={"100%"} withAsterisk label="type" type="input" /> */}
        <TextInput
          w={"100%"}
          withAsterisk
          label="amentities"
          {...form.getInputProps("amentities", { type: "input" })}
        />
        <TextInput
          w={"100%"}
          withAsterisk
          label="status"
          {...form.getInputProps("status", { type: "input" })}
        />
        {/* <Select
          w={"100%"}
          withAsterisk
          label="type"
          clearable
          searchable
          data={data}
          {...form.getInputProps("type", { type: "input" })}
        /> */}
        {/* <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        /> */}
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
